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
    createProductCard
} from '../../scripts/commerce.js';

export default function decorate($block) {
    const productSkus = [];

    $block.querySelectorAll(':scope>div').forEach(($producdCard) => {
        $producdCard.classList.add('product-card');

        const sku =
            $producdCard.firstElementChild.nextElementSibling.textContent;
        productSkus.push(sku);

        $producdCard.remove();
    });

    loadProductsBySku(productSkus).then((products) => {
        loadProductMappings().then((mappings) => {
            products.forEach((product) => {
                $block.appendChild(
                    createProductCard(
                        product,
                        getProductPageUrl(product, mappings)
                    )
                );
            });
        });
    });
}
