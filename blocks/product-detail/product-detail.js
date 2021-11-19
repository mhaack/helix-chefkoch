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
/* global */

import { loadProducts } from '../../scripts/commerce.js';
import { renderProductDetailTemplate } from './product-detail-template.js';

async function loadProductsByUrlKey(productUrlKey) {
    const getProductsByUrlKeyQuery = (urlKey) =>
        `query { storeConfig{ secure_base_media_url } products(filter: { url_key: {eq: ${JSON.stringify(
            urlKey
        )} } }) {items{id uid ...ProductDetailsFragment __typename}__typename}}fragment ProductDetailsFragment on ProductInterface{__typename categories{id uid breadcrumbs{category_id __typename}__typename} description{html __typename} image {url } id uid media_gallery_entries{id uid label position disabled file __typename}meta_description name price{regularPrice{amount{currency value __typename}__typename}__typename}sku small_image{url __typename}stock_status url_key ...on ConfigurableProduct{configurable_options{attribute_code attribute_id id label values{uid default_label label store_label use_default_value value_index swatch_data{...on ImageSwatchData{thumbnail __typename}value __typename}__typename}__typename}variants{attributes{code value_index __typename}product{id uid media_gallery_entries{id uid disabled file label position __typename}sku stock_status price{regularPrice{amount{currency value __typename}__typename}__typename}__typename}__typename}__typename} }`;

    return loadProducts(getProductsByUrlKeyQuery(productUrlKey));
}

async function loadProductsBySku(productSku) {
    const getProductsBySkuQuery = (sku) =>
        `query { products(filter: { sku: {eq: ${JSON.stringify(
            sku
        )} } }) {items{id uid ...ProductDetailsFragment __typename}__typename}}fragment ProductDetailsFragment on ProductInterface{__typename categories{id uid breadcrumbs{category_id __typename}__typename} description{html __typename} image {url } id uid media_gallery_entries{id uid label position disabled file __typename}meta_description name price{regularPrice{amount{currency value __typename}__typename}__typename}sku small_image{url __typename}stock_status url_key ...on ConfigurableProduct{configurable_options{attribute_code attribute_id id label values{uid default_label label store_label use_default_value value_index swatch_data{...on ImageSwatchData{thumbnail __typename}value __typename}__typename}__typename}variants{attributes{code value_index __typename}product{id uid media_gallery_entries{id uid disabled file label position __typename}sku stock_status price{regularPrice{amount{currency value __typename}__typename}__typename}__typename}__typename}__typename} }`;

    return loadProducts(getProductsBySkuQuery(productSku));
}

function getProductIdentifier(productDetailBlock) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('url_key')) {
        return { urlKey: urlParams.get('url_key') };
    } else if (urlParams.has('sku')) {
        return { sku: urlParams.get('sku') };
    } else {
        return {
            sku: productDetailBlock.firstElementChild.nextElementSibling
                .textContent
        };
    }
}

export default function decorate($block) {
    $block.querySelectorAll(':scope>div').forEach(($producdDetail) => {
        const productIdentifier = getProductIdentifier($producdDetail);
        const $containerBlock = $producdDetail.parentElement;
        $producdDetail.remove();
        //console.log(productIdentifier);
        if (productIdentifier.urlKey) {
            loadProductsByUrlKey(productIdentifier.urlKey).then(
                (product) =>
                    ($containerBlock.innerHTML = renderProductDetailTemplate(
                        Array.isArray(product) ? product[0] : product
                    ))
            );
        } else {
            loadProductsBySku(productIdentifier.sku).then(
                (product) =>
                    ($containerBlock.innerHTML =
                        renderProductDetailTemplate(product))
            );
        }
    });
}
