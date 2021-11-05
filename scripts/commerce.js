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

export async function loadProducts(productSkus) {
    const getProductsQuery = (skus) =>
        `query { products(filter: { sku: {in: ${JSON.stringify(
            productSkus
        )} } }) { items { __typename name price_range { minimum_price { final_price { currency value } } } thumbnail { url label } } } }`;

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ query: getProductsQuery(productSkus) })
    };

    const products = await fetch(
        `https://adobeioruntime.net/api/v1/web/mbecker/default/io-proxy.http/graphql`,
        options
    )
        .then((res) => res.json())
        .then((data) => {
            //console.log(data.data.products);
            return Array.isArray(productSkus) && productSkus.length > 1
                ? data.data.products.items
                : data.data.products.items[0];
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return products;
}
