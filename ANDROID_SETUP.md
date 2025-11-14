# Configuração Android - sp-react-native-mqtt

## ✅ Configurações Aplicadas

### Build.gradle Atualizado

O `android/build.gradle` foi configurado com as melhores práticas para auto-linking:

```gradle
def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

android {
  compileSdkVersion safeExtGet('compileSdkVersion', 36)  // ✅ SDK 36
  buildToolsVersion safeExtGet('buildToolsVersion', '34.0.0')

  namespace "com.tuanpm.RCTMqtt"  // ✅ Namespace configurado

  defaultConfig {
    minSdkVersion safeExtGet('minSdkVersion', 24)  // ✅ minSdk 24
    targetSdkVersion safeExtGet('targetSdkVersion', 36)  // ✅ targetSdk 36
  }

  compileOptions {  // ✅ CompileOptions configurado
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}
```

### Características

- ✅ **safeExtGet**: Função para obter valores do projeto pai ou usar fallback
- ✅ **SDK 36**: compileSdkVersion e targetSdkVersion atualizados
- ✅ **minSdk 24**: Suporte Android 7.0+ (Nougat)
- ✅ **Namespace**: Configurado para Android Gradle Plugin 7+
- ✅ **compileOptions**: Java 8 configurado
- ✅ **Auto-linking**: Configurado via `react-native.config.js`
- ✅ **BouncyCastle atualizado**: `bcprov-jdk15to18:1.78.1` (compatível com Java 8-18, evita conflitos)

---

## 📦 Instalação no Seu Projeto

### 1. Instalar o pacote

```bash
npm install sp-react-native-mqtt
# ou
yarn add sp-react-native-mqtt
```

### 2. Verificar Auto-linking

O React Native 0.60+ detecta automaticamente a biblioteca. Verifique:

```bash
npx react-native config
```

Deve mostrar `sp-react-native-mqtt` nas dependências.

### 3. Build

```bash
# Limpar build anterior
cd android
./gradlew clean
cd ..

# Build e run
npx react-native run-android
```

---

## 🔧 Configuração do Projeto Principal

### build.gradle (projeto raiz)

Certifique-se de que seu projeto principal tenha:

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 24
        compileSdkVersion = 36
        targetSdkVersion = 36
        ndkVersion = "23.1.7779620"
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.0")
        classpath("com.facebook.react:react-native-gradle-plugin")
    }
}
```

### settings.gradle

O auto-linking adiciona automaticamente, mas verifique:

```gradle
rootProject.name = 'YourApp'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')
```

### MainApplication.java

O auto-linking adiciona automaticamente os pacotes. Não é necessário adicionar manualmente.

---

## 🚀 Para Expo / EAS Build

### 1. Instalar

```bash
npm install sp-react-native-mqtt
```

### 2. Prebuild

```bash
npx expo prebuild --platform android
```

### 3. Build

```bash
eas build --platform android
```

---

## 🐛 Troubleshooting

### Erro: "Namespace not specified"

**Solução:** O namespace já está configurado no build.gradle. Se ainda aparecer, verifique se o Android Gradle Plugin é 7.0+:

```gradle
classpath 'com.android.tools.build:gradle:8.1.0'
```

### Erro: "minSdkVersion 24 is required"

**Solução:** Atualize o minSdkVersion do seu projeto principal:

```gradle
minSdkVersion = 24
```

### Erro: "compileSdkVersion 36 not found"

**Solução:** Atualize o Android SDK:

```bash
# No Android Studio
Tools > SDK Manager > SDK Platforms > Android 14.0 (API 34)
```

Ou via linha de comando:

```bash
sdkmanager "platforms;android-34"
```

### Auto-linking não funciona

**Solução 1:** Limpar e reconstruir

```bash
cd android
./gradlew clean
cd ..
rm -rf node_modules
npm install
npx react-native run-android
```

**Solução 2:** Verificar react-native.config.js

O arquivo deve existir na raiz do projeto da biblioteca:

```javascript
module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath: 'import com.tuanpm.RCTMqtt.RCTMqttPackage;',
      },
    },
  },
};
```

**Solução 3:** Forçar link manual (não recomendado)

Se o auto-linking falhar, adicione manualmente em `MainApplication.java`:

```java
import com.tuanpm.RCTMqtt.RCTMqttPackage;

// No método getPackages()
packages.add(new RCTMqttPackage());
```

---

## 📋 Verificação

### 1. Verificar se o módulo está linkado

```bash
npx react-native config
```

Procure por `sp-react-native-mqtt` na lista de dependências.

### 2. Verificar no código

```typescript
import MQTT from 'sp-react-native-mqtt';

console.log(MQTT); // Deve imprimir o objeto do módulo
```

### 3. Testar conexão MQTT

```typescript
const client = await MQTT.createClient({
  uri: 'mqtt://test.mosquitto.org:1883',
  clientId: 'test-client',
});

client.on('connect', () => {
  console.log('✅ MQTT conectado com sucesso!');
});
```

---

## 📱 Compatibilidade

- **Android**: 7.0+ (API 24+)
- **React Native**: 0.60+
- **Gradle**: 8.0+
- **Android Gradle Plugin**: 8.1.0
- **Java**: 8+

---

## 🔄 Comparação com react-native-ble-advertiser

Esta biblioteca segue o mesmo padrão de configuração do `react-native-ble-advertiser`:

- ✅ `safeExtGet` para valores flexíveis
- ✅ SDK 36 (atualizado)
- ✅ minSdk 24 (atualizado)
- ✅ Namespace configurado
- ✅ compileOptions Java 8
- ✅ Auto-linking completo

---

## 📚 Recursos Adicionais

- [React Native Auto-linking](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md)
- [Android Gradle Plugin](https://developer.android.com/studio/releases/gradle-plugin)
- [Eclipse Paho MQTT Android](https://www.eclipse.org/paho/clients/android/)

