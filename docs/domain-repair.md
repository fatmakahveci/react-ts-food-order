# GitHub Pages Address

[Back to deployment guide](deployment.md)

The site uses [fatmakahveci.github.io/react-ts-food-order/](https://fatmakahveci.github.io/react-ts-food-order/).
The account website also uses its default GitHub Pages address. Its former
custom-domain setting and CNAME file were removed at the owner's request.

## Publishing

Keep the custom-domain field empty in the account website and this repository.
The CI / CD workflow reads the Pages base URL and repository path, then builds
and deploys the static export. Merge changes into `main` to publish updated
canonical and social metadata. No registrar or external DNS setup is required.

## Verify

```bash
curl -I https://fatmakahveci.github.io/
curl -I https://fatmakahveci.github.io/react-ts-food-order/
```

Both URLs should serve their sites over HTTPS without redirecting to the former
custom domain. Check that `og.png`, menu images and JavaScript load, then
complete a fictional demo order. If an old redirect persists locally, retry in
a fresh browser session and inspect the current Pages configuration.
