/**
 * @file
 * Facet checkboxes.
 */

(function (Drupal) {
  "use strict";

  Drupal.behaviors.facetCheckboxes = {
    attach: function () {
      const checklist = document.querySelector(".facet-summary-checklist");

      function clickHandler(e) {
        e.stopPropagation();

        const target = e.target;
        const parent = target.parentElement;
        const labelElement = parent.querySelector("label");
        const input = parent.querySelector("input");
        const facetQueryKey = input.getAttribute("facet-query-key");

        // Todo: function correctly.
        function removeFacetParams(facetQueryKey) {
          const urlParams = new URLSearchParams(
            window.decodeURIComponent(window.location.search)
          );

          const matchedKeys = [];
          const keys = urlParams.keys();
          let current = keys.next();
          const pattern = new RegExp(`^${facetQueryKey}\\[\\d+]$`);
          do {
            const key = current.value;
            if (pattern.test(key)) {
              matchedKeys.push(key);
            }

            current = keys.next();
          } while (!current.done);

          for (let i = 0; i < matchedKeys.length; i++) {
            urlParams.delete(matchedKeys[i]);
          }

          window.location.search = urlParams.toString();
        }

        // watch for reset click
        if (target.id === "facet-list-reset-link") {
          // stop navigation to void(0)
          e.preventDefault();

          return removeFacetParams(facetQueryKey);
        }

        // we are only watching for label clicks - this is to prevent duplicate events
        if (target.tagName !== "LABEL") {
          return false;
        }

        const labelText = (function (e) {
          if (e === null) {
            return "";
          }
          return e.textContent.trim();
        })(labelElement);

        const checked = !input.checked;
        input.checked = checked;

        // Add active to the label. Could be useful.
        labelElement.classList.add("active");

        const facetQuery = input.getAttribute("facet-key");
        const facetValue = input.getAttribute("facet-value");

        setQueryParams(
          checked,
          labelText,
          facetQueryKey,
          facetQuery,
          facetValue
        );

        function setQueryParams(
          state,
          labelText,
          facetQueryKey,
          facetQuery,
          facetValue
        ) {
          const urlParams = new URLSearchParams(
            window.decodeURIComponent(window.location.search)
          );

          const entries = urlParams.entries();

          const reverseMap = {};
          let current = entries.next();
          do {
            const key = current.value[0];
            const value = current.value[1];

            reverseMap[value] = key;

            current = entries.next();
          } while (!current.done);

          // add a key
          if (state) {
            const nextKey =
              facetQueryKey + "[" + (Object.keys(reverseMap).length + 1) + "]";

            // Use the facetValue instead of the LabeLText, since some facets use content ID as the key.
            const nextQuery = facetQuery + ":" + facetValue;
            urlParams.append(nextKey, nextQuery);
          } else {
            // remove a key
            const value = facetQuery + ":" + facetValue;
            const key = reverseMap[value];

            urlParams.delete(key);
          }

          window.location.search = urlParams.toString();
        }
      }

      checklist.addEventListener("click", clickHandler);
    },
  };
})(Drupal);
