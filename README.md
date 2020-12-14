# Debug Artifacts

Uploads the `event.json` file and environment variables as an artifact for each GitHub Action run

![Example Artifacts](https://user-images.githubusercontent.com/59130/102122508-77df9280-3e3d-11eb-8ae5-66dc3b04f017.png)

## Usage

```yaml
name: Debug Artifacts
on: push

jobs:
  debug-artifacts:
    name: Debug Artifacts
    runs-on: ubuntu-latest
    steps:
      - name: Debug Artifacts
        uses: mheap/debug-artifact@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Available Configuration

### Environment Variables

| Name           | Description                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | The GitHub auth token, used to authenticate API requests. Use the value provided in `${{ secrets.GITHUB_TOKEN }}` |
