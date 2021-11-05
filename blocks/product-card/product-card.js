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

import { createTag, formatPrice } from '../../scripts/helpers.js';
import { loadProducts } from '../../scripts/commerce.js';

export default function decorate($block) {
    $block.querySelectorAll(':scope>div').forEach(($producdCard) => {
        const sku = $producdCard.firstElementChild.innerText;
        $producdCard = $producdCard.parentElement;
        $producdCard.removeChild($producdCard.firstElementChild);

        // get product data
        loadProducts(sku).then((product) => {
            // build product card
            const $imageDiv = createTag('div', { class: 'card-image' });
            const image = product.thumbnail;
            const $productImage = createTag('img', {
                src: image.url,
                alt: image.label
            });
            $imageDiv.appendChild($productImage);
            $producdCard.appendChild($imageDiv);

            const $contentDiv = createTag('div', { class: 'card-content' });
            const $productName = createTag('h2', { class: 'name' });
            $productName.innerText = product.name;
            $contentDiv.appendChild($productName);
            const $productPrice = createTag('p', { class: 'price' });
            const price = product.price_range.minimum_price.final_price;
            $productPrice.innerText = formatPrice(price.value, price.currency);
            $contentDiv.appendChild($productPrice);
            $producdCard.appendChild($contentDiv);
        });
    });
}
