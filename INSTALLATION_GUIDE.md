# Guia de Instalação - sp-react-native-mqtt

## Para projetos React Native puro

### 1. Instalar o pacote

```bash
npm install sp-react-native-mqtt
# ou
yarn add sp-react-native-mqtt
```

### 2. Instalar pods (iOS)

```bash
cd ios && pod install && cd ..
```

### 3. Rebuild

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

---

## Para projetos Expo (com EAS Build)

### 1. Instalar o pacote

```bash
npm install sp-react-native-mqtt
# ou
yarn add sp-react-native-mqtt
```

### 2. Configurar app.json/app.config.js

Adicione o plugin de config se necessário:

```json
{
  "expo": {
    "plugins": [
      // seus outros plugins
    ]
  }
}
```

### 3. Gerar arquivos nativos (prebuild)

```bash
npx expo prebuild
```

Ou se você já tem os arquivos nativos, apenas limpe e reconstrua:

```bash
npx expo prebuild --clean
```

### 4. Build com EAS

```bash
# Build de desenvolvimento
eas build --profile development --platform android
eas build --profile development --platform ios

# Build de produção
eas build --profile production --platform all
```

### 5. Para desenvolvimento local

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

---

## Exemplo de Uso Básico

```typescript
import MQTT from 'sp-react-native-mqtt';

// Criar cliente MQTT
const initMQTT = async () => {
  try {
    const client = await MQTT.createClient({
      uri: 'mqtt://test.mosquitto.org:1883',
      clientId: 'your_unique_client_id',
      keepalive: 60,
      clean: true,
      auth: false,
      automaticReconnect: true, // Android only
    });

    // Configurar event listeners
    client.on('closed', () => {
      console.log('MQTT: Conexão fechada');
    });

    client.on('error', (error) => {
      console.log('MQTT: Erro', error);
    });

    client.on('message', (message) => {
      console.log('MQTT: Mensagem recebida', message);
    });

    client.on('connect', () => {
      console.log('MQTT: Conectado');
      
      // Subscribe a um tópico
      client.subscribe('/seu/topico', 0);
      
      // Publicar mensagem
      client.publish('/seu/topico', 'Hello MQTT', 0, false);
    });

    // Conectar
    client.connect();

    return client;
  } catch (error) {
    console.error('Erro ao criar cliente MQTT:', error);
  }
};
```

## Exemplo com SSL/TLS

```typescript
const client = await MQTT.createClient({
  uri: 'mqtts://broker.example.com:8883',
  clientId: 'your_unique_client_id',
  tls: true,
  auth: true,
  user: 'username',
  pass: 'password',
});
```

## Troubleshooting

### iOS: Pod install falha

```bash
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
```

### Android: Build falha

Certifique-se de que seu `android/build.gradle` usa versões compatíveis:

```gradle
buildscript {
    ext {
        buildToolsVersion = "33.0.0"
        minSdkVersion = 21
        compileSdkVersion = 33
        targetSdkVersion = 33
    }
}
```

### Expo: Módulo não encontrado

Certifique-se de rodar o prebuild após instalar:

```bash
npx expo prebuild --clean
```

## Permissões Necessárias

### Android

As permissões já estão incluídas no AndroidManifest.xml da biblioteca:
- `INTERNET`
- `ACCESS_NETWORK_STATE`
- `WAKE_LOCK`

### iOS

Adicione no seu `Info.plist` se necessário:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

## Links Úteis

- [MQTT Protocol](https://mqtt.org/)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [React Native Autolinking](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md)

