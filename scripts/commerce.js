/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { createTag, formatPrice } from './helpers.js';

const PDP_URL_Template = `/products?url_key=`;

export function getProductPageUrl(product, mappings) {
    const productPageMapping = mappings.find((mapping) => {
        return mapping.sku === product.sku;
    });

    return productPageMapping != null
        ? productPageMapping.path
        : PDP_URL_Template + product.url_key;
}

export async function loadProducts(query) {
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ query: query })
    };

    const products = await fetch(
        `https://adobeioruntime.net/api/v1/web/mbecker/default/io-proxy.http/graphql`,
        options
    )
        .then((res) => res.json())
        .then((data) => {
            return Array.isArray(data.data.products.items) &&
                data.data.products.items.length > 1
                ? data.data.products.items
                : data.data.products.items[0];
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return products;
}

export async function loadProductsBySku(productSkus) {
    const getProductsBySkuQuery = (skus) =>
        `query { products(filter: { sku: {in: ${JSON.stringify(
            skus
        )} } }) { items { __typename name sku url_key price_range { minimum_price { final_price { currency value } } } thumbnail { url label } } } }`;

    return loadProducts(getProductsBySkuQuery(productSkus));
}

export async function loadProductsByUrlKey(productUrlKeys) {
    const getProductsByUrlKeyQuery = (urlKeys) =>
        `query { products(filter: { url_key: {in: ${JSON.stringify(
            urlKeys
        )} } }) { items { __typename name sku url_key price_range { minimum_price { final_price { currency value } } } thumbnail { url label } } } }`;

    return loadProducts(getProductsByUrlKeyQuery(productUrlKeys));
}

export async function loadProductMappings() {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const mappings = await fetch(`/products.json`, options)
        .then((res) => res.json())
        .then((data) => {
            return data.data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return mappings;
}

// build product card
export function createProductCard(product, pdpUrl) {
    const $producdCard = createTag('div', { class: 'product-card' });
    const $productPageHref = createTag('a', { href: pdpUrl });
    $producdCard.appendChild($productPageHref);

    const $imageDiv = createTag('div', { class: 'card-image' });
    const image = product.thumbnail;
    const $productImage = createTag('img', {
        src: image.url,
        alt: image.label
    });
    $imageDiv.appendChild($productImage);
    $productPageHref.appendChild($imageDiv);

    const $contentDiv = createTag('div', { class: 'card-content' });
    const $productName = createTag('h2', { class: 'name' });
    $productName.innerText = product.name;
    $contentDiv.appendChild($productName);
    const $productPrice = createTag('p', { class: 'price' });
    const price = product.price_range.minimum_price.final_price;
    $productPrice.innerText = formatPrice(price.value, price.currency);
    $contentDiv.appendChild($productPrice);
    $productPageHref.appendChild($contentDiv);

    return $producdCard;
}
