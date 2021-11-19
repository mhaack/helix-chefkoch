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
    loadProductsByUrlKey
} from '../../scripts/commerce.js';
import { createTag } from '../../scripts/helpers.js';
import { renderProductDetailTemplate } from './product-detail-template.js';

function getProductIdentifier(productDetailBlock) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('url_key')) {
        return { urlKey: urlParams.get('url_key') };
    } else {
        return {
            sku: productDetailBlock.firstElementChild.nextElementSibling
                .textContent
        };
    }
}

function renderProductDetailBlock($block, product) {
    console.log(product);
    $block.innerHTML = renderProductDetailTemplate(product);
}

export default function decorate($block) {
    $block.querySelectorAll(':scope>div').forEach(($producdDetail) => {
        const productIdentifier = getProductIdentifier($producdDetail);
        const $containerBlock = $producdDetail.parentElement;
        $producdDetail.remove();
        //console.log(productIdentifier);
        if (productIdentifier.urlKey) {
            loadProductsByUrlKey(productIdentifier.urlKey).then((product) =>
                renderProductDetailBlock($containerBlock, product)
            );
        } else {
            loadProductsBySku(productIdentifier.sku).then((product) =>
                renderProductDetailBlock($containerBlock, product)
            );
        }
    });
}
