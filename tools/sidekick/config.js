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
/* global window */

// This file contains the project-specific configuration for the sidekick.
(() => {
  window.hlx.initSidekick({
    project: 'helix-chefkoch',
    outerHost: 'helix-chefkoch--mhaack.hlx.live',
    hlx3: true,
    plugins: [
      // TEMPLATES --------------------------------------------------------------------
      {
        id: 'picker',
        condition: (s) => s.isEditor()
          && (s.location.pathname.includes('/:w:/') || s.location.href.includes('doc.aspx?')),
        button: {
          text: 'Product picker',
          action: (_, s) => {
            const { config } = s;
            window.open(`https://${config.innerHost}/tools/product/picker.html`, 'hlx-sidekick-product-picker');
          },
        },
      },
    ],
  });
})();