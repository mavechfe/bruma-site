// Medicao do site (Google Analytics 4) com consentimento.
// Sem "Aceitar" o Google nao grava cookies; so recebe sinais anonimos sem identificador.
// Eventos: clique_whatsapp, clique_telefone (automaticos) e os que as paginas pedem com medir().
(function () {
  var ID = 'G-W9Z0JMR74W', CHAVE = 'bruma-consentimento';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var escolha = null;
  try { escolha = localStorage.getItem(CHAVE); } catch (e) { }

  function consentimento(sim) {
    var v = sim ? 'granted' : 'denied';
    return { analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: 'denied' };
  }
  gtag('consent', 'default', consentimento(escolha === 'sim'));
  gtag('js', new Date());
  gtag('config', ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  window.medir = function (evento, dados) { gtag('event', evento, dados || {}); };

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (/wa\.me|api\.whatsapp\.com/.test(h)) medir('clique_whatsapp', { pagina: location.pathname });
    else if (/^tel:/.test(h)) medir('clique_telefone', { pagina: location.pathname });
  });

  if (escolha) return;

  function aviso() {
    var d = document.createElement('div');
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookies');
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:460px;margin:0 auto;'
      + 'background:#12333A;color:#FFFFFF;border-radius:14px;padding:16px 18px;box-shadow:0 8px 30px rgba(0,0,0,.25);'
      + 'font:500 14px/1.45 Nunito,system-ui,sans-serif';
    d.innerHTML = '<p style="margin:0 0 12px">Usamos cookies para saber quantas pessoas visitam o site e como nos contactam. '
      + '<a href="/privacidade/" style="color:#5EC5B8">Saber mais</a></p>'
      + '<div style="display:flex;gap:8px;justify-content:flex-end">'
      + '<button type="button" data-c="nao" style="background:transparent;color:#B7D2CE;border:1px solid #B7D2CE;border-radius:999px;padding:8px 16px;font:800 14px Nunito,system-ui,sans-serif;cursor:pointer">Recusar</button>'
      + '<button type="button" data-c="sim" style="background:#5EC5B8;color:#12333A;border:0;border-radius:999px;padding:8px 18px;font:800 14px Nunito,system-ui,sans-serif;cursor:pointer">Aceitar</button>'
      + '</div>';
    d.addEventListener('click', function (e) {
      var c = e.target.getAttribute && e.target.getAttribute('data-c');
      if (!c) return;
      try { localStorage.setItem(CHAVE, c); } catch (x) { }
      gtag('consent', 'update', consentimento(c === 'sim'));
      d.remove();
    });
    document.body.appendChild(d);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aviso);
  else aviso();
})();
