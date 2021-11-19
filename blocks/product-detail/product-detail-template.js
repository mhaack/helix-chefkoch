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

export const renderProductDetailTemplate = (product) => {
    const price = product.price_range.minimum_price.final_price;

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
                        src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd09-pe_main_2.jpg?auto=webp&amp;format=pjpg&amp;width=640&amp;height=800&amp;fit=cover"
                        width="640"></div><button class="carousel-nextButton" type="button"><span
                        class="carousel-chevron icon-root"><svg xmlns="http://www.w3.org/2000/svg" width="40"
                            height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="icon-icon">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg></span></button>
            </div>
            <div class="carousel-thumbnailList"><button
                    class="thumbnail-rootSelected thumbnail-root thumbnail-root" type="button">
                    <div class="image-root image-container"><img loading="eager" alt="Main"
                            class="thumbnail-image image-placeholder_layoutOnly image-placeholder"
                            height="170"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAQAAADIpIVQAAAADklEQVR42mNkgAJGIhgAALQABsHyMOcAAAAASUVORK5CYII="
                            width="135"><img loading="lazy" alt="Main" class="thumbnail-image image-loaded"
                            sizes="135px"
                            src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd09-pe_main_2.jpg?auto=webp&amp;format=pjpg&amp;width=135&amp;height=170&amp;fit=cover"
                            width="135"></div>
                </button><button class="thumbnail-root" type="button">
                    <div class="image-root image-container"><img loading="eager" alt=""
                            class="thumbnail-image image-placeholder_layoutOnly image-placeholder"
                            height="170"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAQAAADIpIVQAAAADklEQVR42mNkgAJGIhgAALQABsHyMOcAAAAASUVORK5CYII="
                            width="135"><img loading="lazy" alt="" class="thumbnail-image image-loaded"
                            sizes="135px"
                            src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd09-pe_alt_1.jpg?auto=webp&amp;format=pjpg&amp;width=135&amp;height=170&amp;fit=cover"
                            width="135"></div>
                </button><button class="thumbnail-root" type="button">
                    <div class="image-root image-container"><img loading="eager" alt=""
                            class="thumbnail-image image-placeholder_layoutOnly image-placeholder"
                            height="170"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAQAAADIpIVQAAAADklEQVR42mNkgAJGIhgAALQABsHyMOcAAAAASUVORK5CYII="
                            width="135"><img loading="lazy" alt="" class="thumbnail-image image-loaded"
                            sizes="135px"
                            src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd09-pe_back_1.jpg?auto=webp&amp;format=pjpg&amp;width=135&amp;height=170&amp;fit=cover"
                            width="135"></div>
                </button></div>
        </div>
    </section>
    <section class="productFullDetail-options">
        <div class="option-root">
            <h3 class="option-title"><span>Fashion Color</span></h3>
            <div class="swatchList-root tileList-root"><button
                    class="swatch-root tile-root clickable-root" title="Peach" type="button"
                    style="--venia-swatch-bg:#fee1d2;"></button><button
                    class="swatch-root tile-root clickable-root" title="Khaki" type="button"
                    style="--venia-swatch-bg:#f9efe5;"></button><button
                    class="swatch-root tile-root clickable-root" title="Lilac" type="button"
                    style="--venia-swatch-bg:#dcd5e1;"></button><button
                    class="swatch-root tile-root clickable-root" title="Rain" type="button"
                    style="--venia-swatch-bg:#d4e3ec;"></button></div>
            <dl class="option-selection">
                <dt class="option-selectionLabel">Selected Fashion Color:</dt>
                <dd>None</dd>
            </dl>
        </div>
        <div class="option-root">
            <h3 class="option-title"><span>Fashion Size</span></h3>
            <div class="tileList-root"><button class="tile-root clickable-root" title="XS"
                    type="button"><span>XS</span></button><button class="tile-root clickable-root" title="S"
                    type="button"><span>S</span></button><button class="tile-root clickable-root" title="M"
                    type="button"><span>M</span></button><button class="tile-root clickable-root" title="L"
                    type="button"><span>L</span></button></div>
            <dl class="option-selection">
                <dt class="option-selectionLabel">Selected Fashion Size:</dt>
                <dd>None</dd>
            </dl>
        </div>
    </section>
    <section class="productFullDetail-quantity productFullDetail-section">
        <h2 class="productFullDetail-quantityTitle option-title">Quantity</h2>
        <div class="productFullDetail-quantityRoot quantity-root"><label
                class="quantity-label"></label><button aria-label="Decrease Quantity"
                class="quantity-button_decrement quantity-button" disabled="" type="button"><span
                    class="quantity-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="icon-icon">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg></span></button><span class="fieldIcons-root"
                style="--iconsBefore:0; --iconsAfter:0;"><span class="fieldIcons-input"><input
                        aria-label="Item Quantity" inputmode="numeric" min="1" pattern="[0-9]*"
                        class="quantity-input textInput-input field-input"
                        id="2f7fc66e-0748-42c0-ad93-29aa60d7b1d1" name="quantity" value="1" spellcheck="false"
                        data-ms-editor="true"></span><span class="fieldIcons-before"></span><span
                    class="fieldIcons-after"></span></span>
            <p class="message-root"></p><button aria-label="Increase Quantity"
                class="quantity-button_increment quantity-button" type="button"><span
                    class="quantity-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="icon-icon">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg></span></button>
        </div>
    </section>
    <section class="productFullDetail-cartActions productFullDetail-section"><button
            class="button-root_highPriority button-root clickable-root" type="submit" disabled=""><span
                class="button-content">Add to Cart</span></button></section>
    <section class="productFullDetail-description productFullDetail-section">
        <h2 class="productFullDetail-descriptionTitle productFullDetail-sectionTitle">Product Description</h2>
        <div class="richText-root">
            <p>The Alexia Maxi Dress laughs at the notion that horizontal stripes are a no-no. The pattern in this dress
                creates a wonderful slimming effect. Add in the exceptionally soft fabric and it's downright
                irresistible. </p>
            <p>Features:</p>
            <ul>
                <li>Scoop neck</li>
                <li>Capped sleeves</li>
                <li>Hits at the ankle</li>
                <li>Front pocket</li>
                <li>Machine wash, line dry</li>
            </ul>
        </div>
    </section>
    <section class="productFullDetail-details productFullDetail-section">
        <h2 class="productFullDetail-detailsTitle productFullDetail-sectionTitle">SKU</h2><strong>VD09</strong>
    </section>
</form>`;
};
