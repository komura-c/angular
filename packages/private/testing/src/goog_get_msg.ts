/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A method that injects goog.getMsg-like function into global scope.
 *
 * This method is required as a *temporary* measure to prevent i18n tests from being blocked while
 * running outside of Closure Compiler. This method will not be needed once runtime translation
 * service support is introduced.
 */
export function polyfillGoogGetMsg(): void {
  const glob = (global as any);
  glob.goog = glob.goog || {};
  glob.goog.getMsg =
      glob.goog.getMsg || function(input: string, placeholders: {[key: string]: string} = {}) {
        return Object.keys(placeholders).length ?
            input.replace(/\{\$(.*?)\}/g, (match, key) => placeholders[key] || '') :
            input;
      };
}
