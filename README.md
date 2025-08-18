# Batch Transfer TRC20

## Gas Stats
| version | batchTransfer |
|---------|-----|
| v1 | bandwidth: 572, energy: 82443 |
| v2 | bandwidth: 572, energy: 48315 |

## Test
```zsh
# docker run -it -p 9090:9090 --rm --name tron tronbox/tre
# NOTE: latest image(dd5bc3ad2e26)
## WARNING: The requested image's platform (linux/arm64) does not match the detected host platform (linux/amd64/v3) and no specific platform was requested
## exec ./quickstart: exec format error

docker run -it -p 9090:9090 --rm --name tron tronbox/tre:dev

npm run test
```