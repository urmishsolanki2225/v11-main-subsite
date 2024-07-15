@extends('subsite-main')

@section('content')
<div class="no_lead_image"></div>


<article class="article_main article_single">
  <header>
	  <h2>Recevez les bulletins d&#039;information de l&#039;IE</h2>
    <x-breadcrumbs />
	  <p>Votre vie privée est importante pour nous. Notre <a href="{{ route('subsite.data-protection-policy') }}">politique de protection de données</a> est <a href="{{ route('subsite.data-protection-policy') }}">ici</a>.</p>
  </header>
  <main>
  <form method="POST" action="https://educationinternational.activehosted.com/proc.php" id="_form_18_" class="_form _form_3 _inline-form  _dark" novalidate>
    <input type="hidden" name="u" value="18" />
    <input type="hidden" name="f" value="18" />
    <input type="hidden" name="s" />
    <input type="hidden" name="c" value="0" />
    <input type="hidden" name="m" value="0" />
    <input type="hidden" name="act" value="sub" />
    <input type="hidden" name="v" value="2" />
    <div class="_form-content">
        <div class="_form_element _x77576340 _full_width _clear" >
          <div class="_form-title">
            <h3>Vos coordonnées et abonnements</h3>
          </div>
        </div>
        <div class="_form_element _x80292207 _full_width " >
          <label for="firstname" class="_form-label">
            Votre prénom*
          </label>
          <div class="_field-wrapper">
            <input type="text" id="firstname" name="firstname" placeholder="Écrivez votre prénom ici" required/>
          </div>
        </div>
        <div class="_form_element _x42897864 _full_width " >
          <label for="lastname" class="_form-label">
            Votre nom de famille*
          </label>
          <div class="_field-wrapper">
            <input type="text" id="lastname" name="lastname" placeholder="Écrivez votre nom de famille ici" required/>
          </div>
        </div>
        <div class="_form_element _field6 _full_width " >
          <label for="field[6]" class="_form-label">
            Votre organisation*
          </label>
          <div class="_field-wrapper">
            <input type="text" id="field[6]" name="field[6]" value="" placeholder="Écrivez votre organisation ici" required/>
          </div>
        </div>
        <div class="_form_element _x78116957 _full_width " >
          <label for="email" class="_form-label">
            Votre courrier électronique*
          </label>
          <div class="_field-wrapper">
            <input type="text" id="email" name="email" placeholder="Écrivez l&#039;adresse de votre courrier électronique ici" required/>
          </div>
        </div>
        <div class="_form_element _x02430797 _full_width " >
          <label for="phone" class="_form-label">
            Téléphone
          </label>
          <div class="_field-wrapper">
            <input type="text" id="phone" name="phone" placeholder="Écrivez votre numéro de téléphone ici" />
          </div>
        </div>
        <div class="_form_element _x12650181 _full_width list_selection" >
          <input type="hidden" name="ls" id="ls" value="1" />
          <label for="nlbox_" class="_form-label">
            Select the lists you wish to subscribe to
          </label>
          <div class="_row">
            <input id="nlbox_111" type="checkbox" value="111" name="nlbox[]" >
            <span>
              Bulletin de l'IE
            </span>
          </div>
          <div class="_row">
            <input id="nlbox_112" type="checkbox" value="112" name="nlbox[]" >
            <span>
              Bulletin du CSEE
            </span>
          </div>
          <div class="_row">
            <input id="nlbox_121" type="checkbox" value="121" name="nlbox[]" >
            <span>
              Bulletin DC
            </span>
          </div>
          <div class="_row">
            <input id="nlbox_114" type="checkbox" value="114" name="nlbox[]" >
            <span>
              Réseau de réponse global
            </span>
          </div>
          <div class="_row">
            <input id="nlbox_182" type="checkbox" value="182" name="nlbox[]" >
            <span>
              Bulletin Arc-En-Ciel
            </span>
          </div>
          <div class="_row">
            <input id="nlbox_185" type="checkbox" value="185" name="nlbox[]" >
            <span>
              Bulletin Peuples Autochtones
            </span>
          </div>
        </div>
        <div class="_form_element _field7 _full_width " >
            <legend class="_form-label">
              J&#039;accepte de fournir à l&#039;Internationale de l&#039;Education mes coordonnées et préférences d&#039;abonnement.
            </legend>
            <fieldset class="_form-fieldset">
            <div class="_row _checkbox-radio">
              <input id="field_7J&#039;accepte" type="radio" name="field[7]" value="J&#039;accepte"  >
              <span>
                <label for="field_7J&#039;accepte">
                  J&#039;accepte
                </span>
              </div>
              <div class="_row _checkbox-radio">
                <input id="field_7Je n&#039;accepte pas" type="radio" name="field[7]" value="Je n&#039;accepte pas"  >
                <span>
                  <label for="field_7Je n&#039;accepte pas">
                    Je n&#039;accepte pas
                  </span>
                </div>
              </fieldset>
            </div>
            <div class="_form_element _x94812095 _full_width " >
              <label for="ls" class="_form-label">
                Merci de vérifier*
              </label>
              <div class="g-recaptcha" data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go">
              </div>
            </div>
            <div class="_button-wrapper _full_width">
              <button id="_form_18_submit" class="_submit" type="submit">
                Soumettre
              </button>
            </div>
            <div class="_clear-element">
            </div>
          </div>
          <div class="_form-thank-you" style="display:none;">
          </div>
        </form>
  </main>
  </article>

  <script type="text/javascript">
window.cfields = {"6":"organisation","7":"jaccepte_de_fournir_linternationale_de_leducation_mes_coordonnes_et_prfrences_dabonnement"};
window._show_thank_you = function(id, message, trackcmp_url, email) {
  var form = document.getElementById('_form_' + id + '_'), thank_you = form.querySelector('._form-thank-you');
  form.querySelector('._form-content').style.display = 'none';
  thank_you.innerHTML = message;
  thank_you.style.display = 'block';
  const vgoAlias = typeof visitorGlobalObjectAlias === 'undefined' ? 'vgo' : visitorGlobalObjectAlias;
  var visitorObject = window[vgoAlias];
  if (email && typeof visitorObject !== 'undefined') {
    visitorObject('setEmail', email);
    visitorObject('update');
  } else if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) {
    // Site tracking URL to use after inline form submission.
    _load_script(trackcmp_url);
  }
  if (typeof window._form_callback !== 'undefined') window._form_callback(id);
};
window._show_error = function(id, message, html) {
  var form = document.getElementById('_form_' + id + '_'), err = document.createElement('div'), button = form.querySelector('button'), old_error = form.querySelector('._form_error');
  if (old_error) old_error.parentNode.removeChild(old_error);
  err.innerHTML = message;
  err.className = '_error-inner _form_error _no_arrow';
  var wrapper = document.createElement('div');
  wrapper.className = '_form-inner';
  wrapper.appendChild(err);
  button.parentNode.insertBefore(wrapper, button);
  document.querySelector('[id^="_form"][id$="_submit"]').disabled = false;
  if (html) {
    var div = document.createElement('div');
    div.className = '_error-html';
    div.innerHTML = html;
    err.appendChild(div);
  }
};
window._load_script = function(url, callback) {
  var head = document.querySelector('head'), script = document.createElement('script'), r = false;
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.src = url;
  if (callback) {
    script.onload = script.onreadystatechange = function() {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        callback();
      }
    };
  }
  head.appendChild(script);
};
(function() {
  if (window.location.search.search("excludeform") !== -1) return false;
  var getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  var setCookie = function(name, value) {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 60 * 60 * 24 * 365;
    now.setTime(expireTime);
    document.cookie = name + '=' + value + '; expires=' + now + ';path=/';
  }
      var addEvent = function(element, event, func) {
    if (element.addEventListener) {
      element.addEventListener(event, func);
    } else {
      var oldFunc = element['on' + event];
      element['on' + event] = function() {
        oldFunc.apply(this, arguments);
        func.apply(this, arguments);
      };
    }
  }
  var _removed = false;
  var form_to_submit = document.getElementById('_form_18_');
  var allInputs = form_to_submit.querySelectorAll('input, select, textarea'), tooltips = [], submitted = false;

  var getUrlParam = function(name) {
    var regexStr = '[\?&]' + name + '=([^&#]*)';
    var results = new RegExp(regexStr, 'i').exec(window.location.href);
    return results != undefined ? decodeURIComponent(results[1]) : false;
  };

  for (var i = 0; i < allInputs.length; i++) {
    var regexStr = "field\\[(\\d+)\\]";
    var results = new RegExp(regexStr).exec(allInputs[i].name);
    if (results != undefined) {
      allInputs[i].dataset.name = window.cfields[results[1]];
    } else {
      allInputs[i].dataset.name = allInputs[i].name;
    }
    var fieldVal = getUrlParam(allInputs[i].dataset.name);

    if (fieldVal) {
      if (allInputs[i].dataset.autofill === "false") {
        continue;
      }
      if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
        if (allInputs[i].value == fieldVal) {
          allInputs[i].checked = true;
        }
      } else {
        allInputs[i].value = fieldVal;
      }
    }
  }

  var remove_tooltips = function() {
    for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
    }
    tooltips = [];
  };
  var remove_tooltip = function(elem) {
    for (var i = 0; i < tooltips.length; i++) {
      if (tooltips[i].elem === elem) {
        tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
        tooltips.splice(i, 1);
        return;
      }
    }
  };
  var create_tooltip = function(elem, text) {
    var tooltip = document.createElement('div'), arrow = document.createElement('div'), inner = document.createElement('div'), new_tooltip = {};
    if (elem.type != 'radio' && elem.type != 'checkbox') {
      tooltip.className = '_error';
      arrow.className = '_error-arrow';
      inner.className = '_error-inner';
      inner.innerHTML = text;
      tooltip.appendChild(arrow);
      tooltip.appendChild(inner);
      elem.parentNode.appendChild(tooltip);
    } else {
      tooltip.className = '_error-inner _no_arrow';
      tooltip.innerHTML = text;
      elem.parentNode.insertBefore(tooltip, elem);
      new_tooltip.no_arrow = true;
    }
    new_tooltip.tip = tooltip;
    new_tooltip.elem = elem;
    tooltips.push(new_tooltip);
    return new_tooltip;
  };
  var resize_tooltip = function(tooltip) {
    var rect = tooltip.elem.getBoundingClientRect();
    var doc = document.documentElement, scrollPosition = rect.top - ((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0));
    if (scrollPosition < 40) {
      tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _below';
    } else {
      tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _above';
    }
  };
  var resize_tooltips = function() {
    if (_removed) return;
    for (var i = 0; i < tooltips.length; i++) {
      if (!tooltips[i].no_arrow) resize_tooltip(tooltips[i]);
    }
  };
  var validate_field = function(elem, remove) {
    var tooltip = null, value = elem.value, no_error = true;
    remove ? remove_tooltip(elem) : false;
    if (elem.type != 'checkbox') elem.className = elem.className.replace(/ ?_has_error ?/g, '');
    if (elem.getAttribute('required') !== null) {
      if (elem.type == 'radio' || (elem.type == 'checkbox' && /any/.test(elem.className))) {
        var elems = form_to_submit.elements[elem.name];
        if (!(elems instanceof NodeList || elems instanceof HTMLCollection) || elems.length <= 1) {
          no_error = elem.checked;
        }
        else {
          no_error = false;
          for (var i = 0; i < elems.length; i++) {
            if (elems[i].checked) no_error = true;
          }
        }
        if (!no_error) {
          tooltip = create_tooltip(elem, "Please select an option.");
        }
      } else if (elem.type =='checkbox') {
        var elems = form_to_submit.elements[elem.name], found = false, err = [];
        no_error = true;
        for (var i = 0; i < elems.length; i++) {
          if (elems[i].getAttribute('required') === null) continue;
          if (!found && elems[i] !== elem) return true;
          found = true;
          elems[i].className = elems[i].className.replace(/ ?_has_error ?/g, '');
          if (!elems[i].checked) {
            no_error = false;
            elems[i].className = elems[i].className + ' _has_error';
            err.push("Checking %s is required".replace("%s", elems[i].value));
          }
        }
        if (!no_error) {
          tooltip = create_tooltip(elem, err.join('<br/>'));
        }
      } else if (elem.tagName == 'SELECT') {
        var selected = true;
        if (elem.multiple) {
          selected = false;
          for (var i = 0; i < elem.options.length; i++) {
            if (elem.options[i].selected) {
              selected = true;
              break;
            }
          }
        } else {
          for (var i = 0; i < elem.options.length; i++) {
            if (elem.options[i].selected && !elem.options[i].value) {
              selected = false;
            }
          }
        }
        if (!selected) {
          elem.className = elem.className + ' _has_error';
          no_error = false;
          tooltip = create_tooltip(elem, "Please select an option.");
        }
      } else if (value === undefined || value === null || value === '') {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "This field is required.");
      }
    }
    if (no_error && elem.name == 'email') {
      if (!value.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "Enter a valid email address.");
      }
    }
    if (no_error && /date_field/.test(elem.className)) {
      if (!value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
        elem.className = elem.className + ' _has_error';
        no_error = false;
        tooltip = create_tooltip(elem, "Enter a valid date.");
      }
    }
    tooltip ? resize_tooltip(tooltip) : false;
    return no_error;
  };
  var needs_validate = function(el) {
        if(el.getAttribute('required') !== null){
            return true
        }
        if(el.name === 'email' && el.value !== ""){
            return true
        }
        return false
  };
  var validate_form = function(e) {
    var err = form_to_submit.querySelector('._form_error'), no_error = true;
    if (!submitted) {
      submitted = true;
      for (var i = 0, len = allInputs.length; i < len; i++) {
        var input = allInputs[i];
        if (needs_validate(input)) {
          if (input.type == 'text') {
            addEvent(input, 'blur', function() {
              this.value = this.value.trim();
              validate_field(this, true);
            });
            addEvent(input, 'input', function() {
              validate_field(this, true);
            });
          } else if (input.type == 'radio' || input.type == 'checkbox') {
            (function(el) {
              var radios = form_to_submit.elements[el.name];
              for (var i = 0; i < radios.length; i++) {
                addEvent(radios[i], 'click', function() {
                  validate_field(el, true);
                });
              }
            })(input);
          } else if (input.tagName == 'SELECT') {
            addEvent(input, 'change', function() {
              validate_field(this, true);
            });
          } else if (input.type == 'textarea'){
            addEvent(input, 'input', function() {
              validate_field(this, true);
            });
          }
        }
      }
    }
    remove_tooltips();
    for (var i = 0, len = allInputs.length; i < len; i++) {
      var elem = allInputs[i];
      if (needs_validate(elem)) {
        if (elem.tagName.toLowerCase() !== "select") {
          elem.value = elem.value.trim();
        }
        validate_field(elem) ? true : no_error = false;
      }
    }
    if (!no_error && e) {
      e.preventDefault();
    }
    resize_tooltips();
    return no_error;
  };
  addEvent(window, 'resize', resize_tooltips);
  addEvent(window, 'scroll', resize_tooltips);
  window['recaptcha_callback'] = function() {
  // Get all recaptchas in the DOM (there may be more than one form on the page).
  var recaptchas = document.getElementsByClassName("g-recaptcha");
  for (var i in recaptchas) {
    // Set the recaptcha element ID, so the recaptcha can be applied to each element.
    var recaptcha_id = "recaptcha_" + i;
    recaptchas[i].id = recaptcha_id;
    var el = document.getElementById(recaptcha_id);
    if (el != null) {
      var sitekey = el.getAttribute("data-sitekey");
      var stoken = el.getAttribute("data-stoken");
      grecaptcha.render(recaptcha_id, {"sitekey":sitekey,"stoken":stoken});
    }
  }
};  _load_script("//www.google.com/recaptcha/api.js?onload=recaptcha_callback&render=explicit");
  window._old_serialize = null;
  if (typeof serialize !== 'undefined') window._old_serialize = window.serialize;
  _load_script("//d3rxaij56vjege.cloudfront.net/form-serialize/0.3/serialize.min.js", function() {
    window._form_serialize = window.serialize;
    if (window._old_serialize) window.serialize = window._old_serialize;
  });
  var form_submit = function(e) {
    e.preventDefault();
    if (validate_form()) {
      // use this trick to get the submit button & disable it using plain javascript
      document.querySelector('#_form_18_submit').disabled = true;
            var serialized = _form_serialize(document.getElementById('_form_18_'));
      var err = form_to_submit.querySelector('._form_error');
      err ? err.parentNode.removeChild(err) : false;
      _load_script('https://educationinternational.activehosted.com/proc.php?' + serialized + '&jsonp=true');
    }
    return false;
  };
  addEvent(form_to_submit, 'submit', form_submit);
})();

</script>

@endsection