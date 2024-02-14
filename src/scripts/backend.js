import { formSuccess } from "./forms";
import { formClear } from "./forms";
import { fancyboxLogic } from "./fancybox.ts";


function init() {
    const path = $('[data-type=templ-path]');

    window.config = {
      path: path.length ? path.val() : '/local/templates/main',
    };
}

$(() => {
    // changeAjax();
    // init();
    // filterTab();
    // pagen();
    forms();
    modal();
    clickAjaxReplaceContent();
    // test();
    // filters();
    // selectChangeDisplayElem();
    // eventClickSetValueModal();
  });

  function modal() {
    $(document).on('click', '[data-modal-ajax]', function() {
      const thisObj = $(this),
        container = $(`#fancy-modal-${thisObj.data('fancy-button')}`);

      $.ajax({
        type: 'GET',
        url: window.location.href,
        dataType: 'html',
        data: thisObj.data('modal-ajax'),
        success: function(r) {
          container.empty();
          container.append($(r));
          fancyboxLogic(thisObj[0]);
        },
      });
    });
  }

  window.filters = {
    data: {
      filters: {},
      ajax: 'filters',
    },
    getData: {
      one: (field, val) => {
        if (!val) {
          delete window.filters.data.filters[field];

          return false;
        }

        window.filters.data.filters[field] = val;

        return true;
      },
      many: (field, val) => {
        let state;

        if (!window.filters.data.filters[field]) {
          window.filters.data.filters[field] = {};
        }

        if (window.filters.data.filters[field][val]) {
          state = false;
          delete window.filters.data.filters[field][val];

          if (!Object.keys(window.filters.data.filters[field]).length) {
            delete window.filters.data.filters[field];
          }
        } else {
          state = true;
          window.filters.data.filters[field][val] = val;
        }

        return state;
      },
    },
  }

  window.objFormSuccess = {
    modal: form => {
        formClear(form[0]);
        formSuccess(form[0]);
    },
    base: form => {
      formResponse(form);
    },
    search: (form, r) => {
      const linkContainer = $(form.data('link-container'));

      linkContainer.empty();
      linkContainer.append($(r));
    },
    redirect: form => {
      window.location.href = form.data('redirect');
    },
    modalClose: () => {
      $('.fancybox-content').find('[data-fancybox-close]').trigger('click');
    },
    replace: () => {
      $('[data-replace]').each((i, item) => {
        const jqObj = $(item),
          view = jqObj.css('display');

        jqObj.css('display', view === 'block' ? 'none' : 'block');
      });
    },
    cloneVal: form => {
      form.find('[data-field][data-link]').each(function() {
        const jqObj = $(this),
          linkElem =  $(`[data-save-link=${jqObj.data('field')}]`).filter((i, item) => $(item).data('entity') !== jqObj.data('entity'));

        let val = '';

        switch (jqObj.prop('tagName')) {
          case 'INPUT':
            val = jqObj.val();
            break;
          case 'SELECT':
            val = jqObj.find(':selected').text();
            break;
        }

        linkElem.each(function() {
          switch ($(this).prop('tagName')) {
            case 'DIV':
              $(this).text(val);
              break;
            case 'INPUT':
              $(this).val(val);
              break;
            case 'SELECT':
              $(this).val(val);
              $(this).trigger('change');
              break;
          }
        });
      });

      const fileElem = form[0].querySelector('[data-file-input]');

      if (!fileElem) {
        return;
      }

      if (!fileElem.appFile.files) {
        return
      }

      const container = $('[data-container=files-parent]'),
        fileItemTemplate = $('[data-template=file-item]');

      if (!container.length) {
        $('[data-fetch=files]').after($('[data-template=files]').clone());
      }

      $.each(fileElem.appFile.files, (i, item) => {
        const fileItem = fileItemTemplate.clone();
        fileItemTemplate.find('[data-file-field]').text(item.name);

        $('[data-container=files]').append(fileItem);
      });
    },
    cloneValFetch: (form, r) => {
      for (const key in r) {
        const linkElem = $(`[data-fetch=${key}]`),
          entity = linkElem.data('fetch-entity');

        if (linkElem.length) {
          switch (entity) {
            case 'text':
              linkElem.text(r[key]);
              break;
            case 'files':
              if (r.files) {
                linkElem.after('<li class="purchase__item active" data-container="files-parent" data-delete><div class="purchase__item-col"><div class="purchase__label">документы</div></div><div class="purchase__item-col"><div class="purchase__files" data-container="files" data-link-form="[data-form-id=edit]"></div></div></li>');

                const filesContainer = $('[data-container=files]'),
                  linkForm = $(filesContainer.data('link-form'));

                let place = linkForm.find('[data-delete]');

                if (!place.length) {
                  linkForm.prepend('<div data-delete></div>');
                  place = linkForm.find('[data-delete]');
                }

                $.each(r.files, (i, data) => {
                  place.prepend(`<input type="hidden" data-type="get-field" data-field="EXISTING_FILES[0][VALUE][${i}]" value="${data.ID}" data-file-id="${data.ORIGINAL_NAME}">`);
                  filesContainer.append(`<div class="purchase__files-item"><div class="purchase__files-name" data-file-field="">${data.ORIGINAL_NAME}</div></div>`);
                });
              }
          }
        }
      }
    },
    counterPlus: () => {
      const counter = $('[data-counter]');

      counter.text(+counter.text() + 1);
    },
    counterMinus: () => {
      const counter = $('[data-counter]');

      counter.text(+counter.text() - 1);
    },
    deleteElems: () => {
      $('[data-delete]').remove();
    },
  }

  window.objFormErrors = {
    base: (form, r) => {
      alert(r.message);
    },
    view: (form, r) => {
      form.find('[data-error]').html(r.message);
    },
  }

  function clickAjaxReplaceContent() {
    $(document).on('click', '[data-click=ajax-replace-content]', function(e) {
      e.preventDefault();

      const thisObj = $(this),
        data = thisObj.data('ajax'),
        containerSelector = thisObj.data('container'),
        container = $(containerSelector),
        params = thisObj.closest('[data-click-ajax-params]').data('click-ajax-params');

      $.ajax({
        type: params.type,
        url: params.url ? params.url : window.location.href,
        data: data,
        success: function (r) {
          let response = $(r).filter(containerSelector);

          if (!response.length) {
            response = $(r).find(containerSelector);
          }

          container.empty();
          container.append(response.children());
        },
      });
    });
  }

  function forms() {
    $(document).on('submit', '[data-type=form-ajax]', function(e) {
      e.preventDefault();

      const form = $(this),
        method = form.attr('method'),
        action = form.attr('action'),
        dataType = form.data('r-type'),
        fileElem = form[0].querySelector('[data-file-input]'),
        file = fileElem ? fileElem.appFile.files : [],
        data = file.length ? new FormData() : {};

      form.find('[data-type=get-field], input:checked[data-field]').each(function () {
        let val = $(this).val();

        if (!val) {
          val = $(this).text();
        }

        if (!val) {
          return;
        }

        const field = $(this).attr('data-field');

        file.length ? data.append(field, val) : data[field] = val;
      });

      $.each(file, (i, item) => {
        data.append(`files[]`, item);
      });

      $.ajax({
        type: method ? method : 'POST',
        url: action ? action : `${window.config.path}/include/ajax/forms/index.php`,
        dataType: dataType ? dataType : 'json',
        data: data,
        contentType: file.length ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: !file.length,
        success: function (r) {
            if (typeof r === 'object') {
                if (r.success) {
                    const func = form.data('func');

                    if (typeof func === 'object') {
                      $.each(func, (i, item) => {
                        window.objFormSuccess[item](form, r);
                      });
                    } else {
                      window.objFormSuccess[func](form, r);
                    }
                  } else {
                    const errorFuncInit = form.data('func-error');

                    errorFuncInit ? window.objFormErrors[errorFuncInit](form, r) : alert(r.message);
                  }
            } else {
                window.objFormSuccess[form.data('func')](form, r);
            }
        },
      });
    });
  }
