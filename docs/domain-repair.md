# Restore the Custom Domain

[Back to deployment guide](deployment.md)

Keep `fatmakahveci.com` as requested. Do not remove the domain from the main
`fatmakahveci.github.io` repository: that setting also controls project-site redirects.

## Observed on 25 September 2026

- This project's Pages API reports no repository-specific custom domain.
- The account website uses `fatmakahveci.com`, with HTTPS enforcement disabled.
- The default project URL redirects to `http://fatmakahveci.com/react-ts-food-order/`.
- DNS lookup returns `SERVFAIL` and mentions domain delegation. This does not by
  itself identify the registrar, prove expiration, or establish a DNSSEC failure.

GitHub deployment succeeds independently of DNS. The remaining repair requires
access to the domain registrar and DNS provider, which are not connected here.

## Repair at the Provider

1. Confirm the domain is active at its registrar. Check that its assigned
   nameservers match the authoritative nameservers supplied by the DNS provider.
2. Ask the provider to resolve the `SERVFAIL` delegation error. If DNSSEC is enabled,
   verify that the registrar's DS records match the active DNS zone's keys. Do not
   disable DNSSEC or change nameservers without confirming the actual mismatch.
3. Once the zone answers, configure the apex (`@`) with these GitHub Pages A records:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

   If `www` is used, point its CNAME to `fatmakahveci.github.io`. Review conflicting
   web-hosting records, while preserving unrelated mail and verification records.
   Follow [GitHub's current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. In the main website's **Settings → Pages**, retain `fatmakahveci.com` and wait
   for the DNS check and certificate provisioning to succeed. Then enable
   **Enforce HTTPS**. Follow [GitHub's HTTPS guide](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
5. Enable HTTPS for this project's Pages settings if it remains disabled. Rerun
   its CI / CD workflow on `main` so the canonical and social URLs use the final
   HTTPS deployment URL.

## Verify

```bash
dig fatmakahveci.com A
dig fatmakahveci.com NS
curl -I https://fatmakahveci.com/react-ts-food-order/
curl -I https://fatmakahveci.github.io/react-ts-food-order/
```

DNS should answer without `SERVFAIL`. The custom HTTPS URL should return the site
with a valid certificate; the default URL should redirect to it. Finally, check
that `og.png`, menu images and JavaScript load, and complete a fictional demo order.
