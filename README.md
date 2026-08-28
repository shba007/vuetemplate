<p align="center">
  <img src="./public/logo.png" lt="Logo" width="65" />
<p>

# VueTemplate

![Landing](public/previews/landing.webp)

> Vue + Typescript + Tailwind + Tauri Template

- 🚀 PWA
- ✋ Push Notification
- 🌙 Light/Dark Mode
- 🐋 Containerized
- 🪄 CI/CD (Github Action)
- 📐 Analytics

# Todo

- [ ] Add Testing

## External Dependencies

- gitleaks

## Clone Template

Clone the template

```bash
bunx giget@latest gh:shba007/vuetemplate#<branch> <project>
```

## Change Placeholder Value

### In docker-compose.yml

- name
- image
- port

### In package.json change the following

- name
- description
- docker:build
- docker:start

### In nuxt.config.ts change the following

- site
  - url
  - name
- pwa
  - manifest
    - name
    - short_name
    - description
    - theme_color
    - background_color

### In tailwind.config.ts change the following

- fontFamily
  - head
  - body
- colors
  - light
  - dark
  - primary
  - success
  - warning
  - alert

### In src-tauri/Cargo.toml change the following

- name
- description
- repository

### In src-tauri/tauri.conf.json change the following

- productName
- identifier
- app
  - windows
    - title

### In .github\workflows\deploy.yml change the following

- asset_name [deploy.yml](.github/workflows/deploy.yml) in line 271

### In github registry add Repo or Org Vars following

- Vars
  - USERNAME

## Change the Icons and Screenshots

dir public/pwa

## Generate Logo

bun tauri icon ./public/logo.svg

## Reinitialize Android

rm -rf src-tauri/gen/android
bun tauri android init

set tauri.conf.json to "version": "../package.json",

## Appstore Signing Config

goto src-tauri/gen/android/app/build.gradle.kts

```kotlin
import java.io.FileInputStream

defaultConfig {
...
}
signingConfigs {
    create("release") {
        val keystorePropertiesFile = rootProject.file("keystore.properties")
        val keystoreProperties = Properties()
        if (keystorePropertiesFile.exists()) {
            keystoreProperties.load(FileInputStream(keystorePropertiesFile))
        }

        keyAlias = keystoreProperties["keyAlias"] as String
        keyPassword = keystoreProperties["password"] as String
        storeFile = file(keystoreProperties["storeFile"] as String)
        storePassword = keystoreProperties["password"] as String
    }
}

getByName("release") {
    isMinifyEnabled = true
    signingConfig = signingConfigs.getByName("release")
...
}
```

put release-keystore.jks, keystore.properties into src-tauri/gen/android

add those files into the .gitignore on the same folder

### Desktop Updater Signing Config

**1. Generate Keypair**

```bash
bun x tauri signer generate -w ./src-tauri/app-sign.key

```

_Copy the public key printed in the terminal._

**2. Add GitHub Repository Secrets**

Go to **Settings** → **Secrets and variables** → **Actions**:

- `TAURI_SIGNING_PRIVATE_KEY`: Content of `./src-tauri/app-sign.key`
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`: Key password (leave empty if none)

**3. Configure `src-tauri/tauri.conf.json**`

```json
{
  "bundle": {
    "createUpdaterArtifacts": true
  },
  "plugins": {
    "updater": {
      "pubkey": "YOUR_PUBLIC_KEY_HERE",
      "endpoints": ["https://github.com/<OWNER>/<REPO>/releases/latest/download/latest.json"]
    }
  }
}
```

**4. Add Key to `.gitignore**`

```gitignore
src-tauri/app-sign.key

```

## Development Server

Start the development server on `http://localhost:3000`:

## How to Deploy

1. Initialize Swarm on the Manager Node

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

2. Join Worker Nodes to the Swarm

```bash
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377
```

3. Check Node Status

```bash
docker node ls
```

4. Create a docker volume

```bash
docker volume create \
  --name vuetemplate_static \
  --driver local \
  --opt type=none \
  --opt device=~/shba007/vuetemplate/static \
  --opt o=bind
```

5. Use Docker Stack to deploy multi-container application

```bash
upload static into /root/vuetemplate
```

6. Scale service

```bash
docker service scale vuetemplate_app=2
```

7. Verify

```bash
docker service ls
docker service ps vuetemplate_app
```

## License

Published under the [MIT](https://github.com/shba007/vuetemplate/blob/main/LICENSE) license.
<br><br>
<a href="https://github.com/shba007/vuetemplate/graphs/contributors">
<img src="https://contrib.rocks/image?repo=shba007/vuetemplate" />
</a>