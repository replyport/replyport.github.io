(() => {
  'use strict';

  // Public browser identifier from OpenAI Ads Manager. This is not an API key.
  // Leave blank until the ReplyPort web data source has been created.
  const OPENAI_PIXEL_ID = '';
  const STORE_PRODUCT_ID = '9PPGN3H4QGJJ';
  const CHATGPT_LAUNCH_CID = 'chatgpt_launch';
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
    const isChatGptLaunch =
      (params.get('utm_source') || '').toLowerCase() === 'chatgpt' &&
      (params.get('utm_campaign') || '').toLowerCase() === 'launch';

    if (!isChatGptLaunch) return;

    storeLinks().forEach((anchor) => {
      const target = new URL(anchor.href);
      target.searchParams.set('cid', CHATGPT_LAUNCH_CID);
      anchor.href = target.toString();
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
      anchor.addEventListener(
        'click',
        () => {
          window.oaiq(
            'measure',
            'custom',
            {
              type: 'custom',
              contents: [
                {
                  id: STORE_PRODUCT_ID,
                  name: 'ReplyPort',
                  content_type: 'product',
                },
              ],
            },
            {
              custom_event_name: 'microsoft_store_click',
              opt_out: true,
            }
          );
        },
        { capture: true }
      );
    });
  };

  preserveTrackingOnInternalLinks();
  addMicrosoftCampaignId();
  installOpenAiPixel();
})();
