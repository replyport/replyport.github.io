(() => {
  'use strict';

  // Public browser identifier from OpenAI Ads Manager. This is not an API key.
  // Leave blank until the ReplyPort web data source has been created.
  const OPENAI_PIXEL_ID = 'B5mqYqGA8oW13e9Do7Yc9B';
  const STORE_PRODUCT_ID = '9PPGN3H4QGJJ';
  const CHATGPT_LAUNCH_CID = 'chatgpt_launch';
  const GOOGLE_SEARCH_CID = 'google_search_oct26';
  const GOOGLE_ADS_CONVERSION_SEND_TO = 'AW-18493139821/Suf_CMn4kZAdEO3Wm_JE';
  const TRACKING_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_id',
    'oppref',
  ];

  const params = new URLSearchParams(window.location.search);

  const pageIdentity = () => {
    if (window.location.pathname.startsWith('/setup/')) return ['setup', 'ReplyPort setup'];
    if (window.location.pathname.startsWith('/privacy/')) return ['privacy', 'ReplyPort privacy'];
    return ['landing', 'ReplyPort landing page'];
  };

  const preserveTrackingOnInternalLinks = () => {
    const carried = TRACKING_KEYS.filter((key) => params.has(key) && params.get(key));
    if (!carried.length) return;

    document.querySelectorAll('a[href]').forEach((anchor) => {
      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;

      let target;
      try {
        target = new URL(raw, window.location.href);
      } catch {
        return;
      }

      if (target.origin !== window.location.origin) return;

      carried.forEach((key) => {
        if (!target.searchParams.has(key)) target.searchParams.set(key, params.get(key));
      });
      anchor.href = target.toString();
    });
  };

  const storeLinks = () =>
    Array.from(document.querySelectorAll('a[href]')).filter((anchor) => {
      try {
        const target = new URL(anchor.href, window.location.href);
        return (
          target.hostname === 'apps.microsoft.com' &&
          target.pathname.toUpperCase().includes(STORE_PRODUCT_ID)
        );
      } catch {
        return false;
      }
    });

  const addMicrosoftCampaignId = () => {
    const source = (params.get('utm_source') || '').toLowerCase();
    const campaign = (params.get('utm_campaign') || '').toLowerCase();

    let cid = '';
    if (source === 'chatgpt' && campaign === 'launch') {
      cid = CHATGPT_LAUNCH_CID;
    } else if (source === 'google' && campaign === 'search_oct26') {
      cid = GOOGLE_SEARCH_CID;
    }

    if (!cid) return;

    storeLinks().forEach((anchor) => {
      const target = new URL(anchor.href);
      target.searchParams.set('cid', cid);
      anchor.href = target.toString();
    });
  };

  const installGoogleAdsConversionTracking = () => {
    if (!window.gtag) return;

    storeLinks().forEach((anchor) => {
      anchor.addEventListener(
        'click',
        (event) => {
          const send = (callback) => {
            const payload = {
              send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
            };
            if (callback) {
              payload.event_callback = callback;
              payload.event_timeout = 1000;
            }
            window.gtag('event', 'conversion', payload);
          };

          // Preserve modified-click behaviour such as Ctrl/Cmd-clicking into a
          // new tab. The conversion event can still be queued without taking
          // over navigation.
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
            send();
            return;
          }

          event.preventDefault();
          const url = anchor.href;
          let navigated = false;
          const navigate = () => {
            if (navigated) return;
            navigated = true;
            window.location.assign(url);
          };

          send(navigate);
          window.setTimeout(navigate, 1100);
        },
        { capture: true }
      );
    });
  };

  const installOpenAiPixel = () => {
    if (!OPENAI_PIXEL_ID) return;

    if (!window.oaiq) {
      const q = function () {
        q.q.push(arguments);
      };
      q.q = [];
      window.oaiq = q;

      const js = document.createElement('script');
      js.async = true;
      js.src = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(js, firstScript);
    }

    window.oaiq('init', {
      pixelId: OPENAI_PIXEL_ID,
      debug: params.get('oai_pixel_debug') === '1',
    });

    const [pageId, pageName] = pageIdentity();
    window.oaiq(
      'measure',
      'page_viewed',
      {
        type: 'contents',
        contents: [
          {
            id: pageId,
            name: pageName,
            content_type: 'page',
          },
        ],
      },
      { opt_out: true }
    );

    storeLinks().forEach((anchor) => {
      let sentAt = 0;

      const measureStoreClick = () => {
        const now = Date.now();
        if (now - sentAt < 1000) return;
        sentAt = now;

        window.oaiq(
          'measure',
          'custom',
          { type: 'custom' },
          {
            custom_event_name: 'microsoft_store_click',
            opt_out: true,
          }
        );
      };

      // Send on pointer-down so the Pixel has time to queue the event before
      // the browser leaves for apps.microsoft.com. Keep click as a keyboard
      // activation fallback, with the short guard above preventing duplicates.
      anchor.addEventListener('pointerdown', measureStoreClick, { capture: true });
      anchor.addEventListener('click', measureStoreClick, { capture: true });
    });
  };

  preserveTrackingOnInternalLinks();
  addMicrosoftCampaignId();
  installGoogleAdsConversionTracking();
  installOpenAiPixel();
})();
