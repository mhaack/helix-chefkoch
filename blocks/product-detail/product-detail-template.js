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

import { formatPrice } from '../../scripts/helpers.js';

const THUMBNAIL_TEMPLATE = (
    baseMediaUrl,
    thumbnailImgSrc
) => `<button class="thumbnail-root thumbnail-root" type="button">
            <div class="image-root image-container">
                <img loading="eager" alt="Main"
                    class="thumbnail-image image-placeholder_layoutOnly image-placeholder"
                    height="170"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAQAAADIpIVQAAAADklEQVR42mNkgAJGIhgAALQABsHyMOcAAAAASUVORK5CYII="
                    width="135"><img loading="lazy" alt="Main" class="thumbnail-image image-loaded"
                    sizes="135px"
                    src="${baseMediaUrl}${thumbnailImgSrc}"
                    width="135">
            </div>
        </button>`;

const OPTION_SWATCH_TEMPLATE = (value) =>
    `<button class="swatch-root tile-root clickable-root" title="${value.label}" type="button" style="--venia-swatch-bg:${value.swatch_data.value};"></button>`;

const OPTION_TILE_TEMPLATE = (value) =>
    `<button class="tile-root clickable-root" title="${value.label}" type="button"><span>${value.label}</span></button>`;

const OPTIONS_TEMPLATE = (option, swatch) => `<div class="option-root">
            <span class="option-title">${option.label}</span>
            <div class="${swatch ? 'swatchList-root' : ''} tileList-root">
                ${option.values
                    .map((value) => {
                        if (swatch) {
                            return OPTION_SWATCH_TEMPLATE(value);
                        } else {
                            return OPTION_TILE_TEMPLATE(value);
                        }
                    })
                    .join(' ')}
            </div>
        </div>`;

const isProductConfigurable = (product) =>
    product.__typename === 'ConfigurableProduct';

export const renderProductDetailTemplate = (product) => {
    const price = product.price.regularPrice.amount;

    const baseMediaUrl = product.image.url.substr(
        0,
        product.image.url.indexOf('/cache')
    );
    let thumbnailsHTML = product.media_gallery_entries
        .map((x) => THUMBNAIL_TEMPLATE(baseMediaUrl, x.file))
        .join(' ');

    let optionsHTML = '';
    if (isProductConfigurable(product)) {
        optionsHTML = product.configurable_options
            .map((option) => {
                const swatch = option.attribute_code === 'fashion_color';
                return OPTIONS_TEMPLATE(option, swatch);
            })
            .join(' ');
    }

    return `<form class="productFullDetail-root">
    <section class="productFullDetail-title">
        <h1 class="productFullDetail-productName">${product.name}</h1>
        <p class="productFullDetail-productPrice">${formatPrice(
            price.value,
            price.currency
        )}</p>
    </section>
    <section class="productFullDetail-imageCarousel">
        <div class="carousel-root">
            <div class="carousel-carouselContainer"><button class="carousel-previousButton" type="button"><span
                        class="carousel-chevron icon-root"><svg xmlns="http://www.w3.org/2000/svg" width="40"
                            height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="icon-icon">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg></span></button>
                <div class="carousel-imageContainer image-container"><img loading="eager" alt="Main"
                        class="carousel-currentImage image-placeholder_layoutOnly image-placeholder"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAQAAADIpIVQAAAADklEQVR42mNkgAJGIhgAALQABsHyMOcAAAAASUVORK5CYII="
                        width="640"><img loading="lazy" alt="Main" class="carousel-currentImage image-loaded"
                        sizes="640px"
                        src="${product.image.url}"
                        width="640"></div><button class="carousel-nextButton" type="button"><span
                        class="carousel-chevron icon-root"><svg xmlns="http://www.w3.org/2000/svg" width="40"
                            height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="icon-icon">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg></span></button>
            </div>
            <div class="carousel-thumbnailList">${thumbnailsHTML}</div>
        </div>
    </section>
    <section class="productFullDetail-options">
        ${optionsHTML}
    </section>
    <section class="productFullDetail-quantity productFullDetail-section">
        <h2 class="productFullDetail-quantityTitle option-title">Quantity</h2>
        <div class="productFullDetail-quantityRoot quantity-root"><label
                class="quantity-label"></label><span class="fieldIcons-root"
                style="--iconsBefore:0; --iconsAfter:0;"><span class="fieldIcons-input"><input
                        aria-label="Item Quantity" inputmode="numeric" min="1" pattern="[0-9]*"
                        class="quantity-input textInput-input field-input"
                        id="2f7fc66e-0748-42c0-ad93-29aa60d7b1d1" name="quantity" value="1" spellcheck="false"
                        data-ms-editor="true"></span><span class="fieldIcons-before"></span><span
                    class="fieldIcons-after"></span></span>

        </div>
    </section>
    <section class="productFullDetail-actions productFullDetail-section">
        <button class="button-root_highPriority button-root clickable-root" type="submit" disabled=""><span
            class="button-content">Add to Cart</span></button>
        <button class="addToListButton-root" type="button" aria-label="Add to Favorites">
            <span class="icon-root"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span> Add to Favorites</button>
    </section>
    <section class="productFullDetail-description productFullDetail-section">
        <h2 class="productFullDetail-descriptionTitle productFullDetail-sectionTitle">Product Description</h2>
        <div class="richText-root">${product.description.html}</div>
    </section>
    <section class="productFullDetail-details productFullDetail-section">
        <h2 class="productFullDetail-detailsTitle productFullDetail-sectionTitle">SKU</h2><strong>${
            product.sku
        }</strong>
    </section>
</form>`;
};
