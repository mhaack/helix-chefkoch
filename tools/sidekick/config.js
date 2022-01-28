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
      hlx3: true,
      plugins: [{
        id: 'edit',
        condition: () => false,
      }, {
        id: 'preview',
        condition: () => false,
      }, {
        id: 'publish',
        condition: () => false,
      }, {
        id: 'live',
        condition: () => false,
      }, {
        id: 'edit2',
        condition: (sidekick) => !sidekick.isEditor() && sidekick.isHelix()
            && sidekick.status.edit && sidekick.status.edit.url,
        button: {
            text: 'Edit',
            action: async (e, sk) => {
                const { config, status } = sk;
                // const editUrl = status.edit && status.edit.url;
                const editUrl = 'https://docs.google.com/document/d/1phTkZrSJdw6S5lW716mrgXyPrRhIm-PXXN-FBu60eYg/edit';
                
                window.open(editUrl, `hlx-sk-edit--${config.owner}/${config.repo}/${config.ref}${status.webPath}`);
            },
        }
    }, {
          // CUSTOM EDIT / PREVIEW
        id: 'preview2',
        condition: (sidekick) => sidekick.isEditor() || sidekick.isHelix(),
        button: {
            text: 'Preview',
            action: async (evt, sk) => {
                sk.showModal('Please wait …', true);
                const res = await sk.update();
                const { path } = res;
                let p = path.replace('/venia-helix', '');
                const res2 = await fetch(`https://${sk.config.innerHost}/url-mappings.json`);
                const json = await res2.json();
                const mapping = json.data.find(e => e.hlx === p);
                window.open(`http://localhost:10000${mapping ? mapping.venia : p}`);
                sk.hideModal();
            },
            isPressed: (sidekick) => sidekick.isInner(),
            },
        },
          // TEMPLATES --------------------------------------------------------------------
          {
              id: 'product-picker',
              condition: (s) => s.isEditor(),
              button: {
                  text: 'Product picker',
                  action: (_, s) => {
                      const { config } = s;
                      window.open(
                          `https://${config.innerHost}/tools/product/picker.html`,
                          'hlx-sidekick-product-picker'
                      );
                  }
              }
          },
          {
              id: 'category-picker',
              condition: (s) => s.isEditor(),
              button: {
                  text: 'Category picker',
                  action: (_, s) => {
                      const { config } = s;
                      window.open(
                          `https://${config.innerHost}/tools/category/picker.html`,
                          'hlx-sidekick-category-picker'
                      );
                  }
              }
          }
      ]
  });
})();