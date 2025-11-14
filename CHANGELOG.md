# Changelog

## [0.6.1] - Auto-linking e EAS Build Support

### ✨ Novos Recursos

- ✅ **Auto-linking completo** para React Native 0.60+
- ✅ **Suporte EAS Build** para projetos Expo
- ✅ **TypeScript definitions** incluídas no package
- ✅ Arquivo `react-native.config.js` para configuração automática

### 🔧 Melhorias iOS

- Atualizado `sp-react-native-mqtt.podspec` para versão moderna
- Deployment target iOS atualizado para 11.0+
- Dependência MQTTClient automaticamente gerenciada (~> 0.15.3)
- Compatível com React-Core moderno

### 🤖 Melhorias Android

- ✅ **Gradle atualizado** para versão 8.1.0
- ✅ **Namespace Android** configurado (com.tuanpm.RCTMqtt)
- ✅ **SDK atualizado**: compileSdkVersion 36, targetSdkVersion 36
- ✅ **minSdkVersion atualizado** para 24 (Android 7.0+)
- ✅ **safeExtGet** implementado para compatibilidade com projetos pai
- ✅ **compileOptions** configurado (Java 8)
- ✅ **Auto-linking completo** via react-native.config.js
- Dependências MQTT atualizadas:
  - `org.eclipse.paho.client.mqttv3:1.2.5`
  - `org.bouncycastle:bcprov-jdk15on:1.70`
- BuildToolsVersion atualizado para 34.0.0

### 📦 Package.json

- Adicionado campo `types` apontando para `index.d.ts`
- Adicionado campo `files` para incluir apenas arquivos necessários
- Adicionadas `peerDependencies` (react, react-native)
- Keywords atualizadas para melhor descoberta

### 📚 Documentação

- README.md atualizado com instruções de EAS Build
- Criado `IOS_SETUP_GUIDE.md` com guia completo iOS
- Criado `INSTALLATION_GUIDE.md` com exemplos práticos
- Criado `Podfile.example` como referência
- Criado `eas.example.json` para configuração EAS

### 🗑️ Limpeza

- `.npmignore` criado para evitar publicar arquivos desnecessários
- `.gitignore` atualizado com mais padrões
- AndroidManifest.xml limpo (namespace movido para build.gradle)

### 🔄 Compatibilidade

- React Native: 0.60+
- Expo: 49.0.0+
- iOS: 11.0+
- Android: API 24+ (Android 7.0+)
- Android Gradle Plugin: 8.1.0
- Gradle: 8.0+

### 📝 Como Usar em Outro Projeto

#### React Native Puro:
```bash
npm install sp-react-native-mqtt
cd ios && pod install && cd ..
npx react-native run-ios
```

#### Expo/EAS:
```bash
npm install sp-react-native-mqtt
npx expo prebuild
eas build --platform ios
```

### 🐛 Bug Fixes

- Corrigido auto-linking para React Native moderno
- Corrigido compatibilidade com Android Gradle Plugin 7+
- Corrigido namespace Android

---

## [0.6.0] - Versão Anterior

Versão original do fork antes das melhorias de auto-linking.

