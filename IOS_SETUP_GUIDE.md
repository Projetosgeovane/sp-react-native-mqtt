# Guia Completo de Configuração iOS - sp-react-native-mqtt

## 📱 Para React Native Puro (iOS)

### 1. Instalar o pacote

```bash
npm install sp-react-native-mqtt
# ou
yarn add sp-react-native-mqtt
```

### 2. Instalar CocoaPods

```bash
cd ios
pod install
cd ..
```

### 3. Build e Run

```bash
npx react-native run-ios
```

---

## 🚀 Para Expo / EAS Build (iOS)

### Passo 1: Instalar o pacote

```bash
npm install sp-react-native-mqtt
# ou  
yarn add sp-react-native-mqtt
```

### Passo 2: Configurar app.json ou app.config.js

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app",
    "version": "1.0.0",
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.yourapp",
      "buildNumber": "1.0.0",
      "deploymentTarget": "13.0"
    },
    "plugins": []
  }
}
```

### Passo 3: Executar Prebuild

Gere os arquivos nativos iOS:

```bash
npx expo prebuild --platform ios
```

Ou para limpar e regenerar:

```bash
npx expo prebuild --clean --platform ios
```

### Passo 4: Verificar o Podfile

Após o prebuild, verifique se o arquivo `ios/Podfile` foi gerado. Ele deve se parecer com:

```ruby
require File.join(File.dirname(`node --print "require.resolve('expo/package.json')"`), "scripts/autolinking")
require File.join(File.dirname(`node --print "require.resolve('react-native/package.json')"`), "scripts/react_native_pods")

platform :ios, '13.0'
install! 'cocoapods', :deterministic_uuids => false

target 'YourAppName' do
  use_expo_modules!
  config = use_native_modules!

  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => true
  )

  post_install do |installer|
    react_native_post_install(installer)
    
    # Garantir iOS 13.0+ para todos os pods
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
      end
    end
  end
end
```

### Passo 5: Instalar Pods

```bash
cd ios
pod install
cd ..
```

### Passo 6: Build Local (Desenvolvimento)

```bash
npx expo run:ios
```

### Passo 7: Build com EAS

#### Configurar eas.json

Crie ou atualize `eas.json` na raiz do projeto:

```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true,
        "buildConfiguration": "Debug"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false,
        "buildConfiguration": "Release"
      }
    },
    "production": {
      "ios": {
        "simulator": false,
        "buildConfiguration": "Release"
      }
    }
  }
}
```

#### Executar Build

```bash
# Build de desenvolvimento
eas build --profile development --platform ios

# Build preview (TestFlight)
eas build --profile preview --platform ios

# Build de produção
eas build --profile production --platform ios
```

---

## 🔧 Troubleshooting iOS

### Erro: "MQTTClient not found"

**Solução:**

```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install
cd ..
```

### Erro: "Undefined symbols for architecture"

**Solução:** Limpar build e reinstalar pods

```bash
cd ios
rm -rf build DerivedData
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..
```

### Erro: "No such module 'MQTTClient'"

**Solução:** Verificar se a dependência está no Podfile.lock

```bash
cd ios
cat Podfile.lock | grep MQTTClient
```

Deve aparecer algo como:

```
- MQTTClient (~> 0.15.3)
- MQTTClient (0.15.3)
```

Se não aparecer, force a instalação:

```bash
pod install --repo-update
```

### Erro no EAS Build: "Pod install failed"

**Solução 1:** Verificar versão do iOS deployment target

No `eas.json`, adicione:

```json
{
  "build": {
    "production": {
      "ios": {
        "buildConfiguration": "Release",
        "cocoapods": "1.15.0"
      }
    }
  }
}
```

**Solução 2:** Adicionar configuração personalizada no eas.json

```json
{
  "build": {
    "production": {
      "ios": {
        "buildConfiguration": "Release",
        "config": "Release"
      }
    }
  }
}
```

### Build funciona local mas falha no EAS

Verifique se todas as dependências estão corretas no package.json:

```json
{
  "dependencies": {
    "sp-react-native-mqtt": "^0.6.1"
  }
}
```

E force o cache no EAS:

```bash
eas build --platform ios --clear-cache
```

---

## 📋 Verificação da Instalação

### 1. Verificar se o pod foi instalado

```bash
cd ios
cat Podfile.lock | grep -A 5 "sp-react-native-mqtt"
```

Deve mostrar:

```
sp-react-native-mqtt (0.6.1):
  - MQTTClient (~> 0.15.3)
  - React-Core
```

### 2. Verificar autolinking

```bash
npx react-native config
```

Deve listar `sp-react-native-mqtt` nas dependências com linking automático.

### 3. Testar no código

```typescript
import MQTT from 'sp-react-native-mqtt';

console.log(MQTT); // Deve imprimir o objeto do módulo
```

---

## 🎯 Configurações Recomendadas para iOS

### Info.plist

Para conexões não-HTTPS (apenas desenvolvimento), adicione:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### Background Modes

Se precisar de MQTT em background, habilite no Xcode:

1. Abra `ios/YourApp.xcworkspace` no Xcode
2. Selecione o target do app
3. Vá em "Signing & Capabilities"
4. Adicione "Background Modes"
5. Marque:
   - ✅ Background fetch
   - ✅ Remote notifications
   - ✅ Background processing

Ou adicione no Info.plist:

```xml
<key>UIBackgroundModes</key>
<array>
    <string>fetch</string>
    <string>remote-notification</string>
    <string>processing</string>
</array>
```

---

## 📦 Versões Testadas

- **React Native**: 0.72.0+
- **Expo**: 49.0.0+
- **iOS Deployment Target**: 13.0+
- **CocoaPods**: 1.12.0+
- **Xcode**: 14.0+

---

## 🆘 Suporte

Se encontrar problemas:

1. Limpe todos os caches:
```bash
# Limpar React Native
rm -rf node_modules
npm cache clean --force
npm install

# Limpar iOS
cd ios
rm -rf build DerivedData Pods Podfile.lock
pod install
cd ..

# Limpar Metro
npx react-native start --reset-cache
```

2. Para Expo/EAS:
```bash
npx expo prebuild --clean
cd ios && pod install && cd ..
eas build --platform ios --clear-cache
```

3. Verifique os logs do EAS:
```bash
eas build:view
```

