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

import {
    loadProductsBySku,
    loadProductMappings,
    getProductPageUrl,
} from '../../scripts/commerce.js';

import { createTag, formatPrice } from '../../scripts/helpers.js';

function createProductTeaser(product, pdpUrl) {
    const $productTeaser = createTag('div', { class: 'product-teaser' });
    const $productPageHref = createTag('a', { href: pdpUrl });
    $productTeaser.appendChild($productPageHref);

    const $imageDiv = createTag('div', { class: 'teaser-image' });
    const image = product.thumbnail;
    const $productImage = createTag('img', {
        src: image.url,
        alt: image.label
    });
    $imageDiv.appendChild($productImage);
    $productPageHref.appendChild($imageDiv);

    const $content = createTag('div', { class: 'teaser-content' });
    $productPageHref.appendChild($content);

    const $productName = createTag('h2', { class: 'teaser-name' });
    $productName.innerText = product.name;
    $content.appendChild($productName);

    const $productDesc = createTag('div', { class: 'teaser-description' });
    $productDesc.innerHTML = product.description.html;
    $content.appendChild($productDesc);

    const $productPrice = createTag('p', { class: 'teaser-price' });
    const price = product.price_range.minimum_price.final_price;
    $productPrice.innerText = formatPrice(price.value, price.currency);
    $productPageHref.appendChild($productPrice);


    return $productTeaser;
}

export default async function decorate($block) {
    const div = $block.querySelector(':scope>div');
    const sku =
        div.firstElementChild.nextElementSibling.textContent;
    div.innerHTML = '';

    const product = await loadProductsBySku(sku);
    const mappings = await loadProductMappings();
    div.innerHTML = createProductTeaser(
        product,
        getProductPageUrl(product, mappings)
    ).innerHTML;
}
