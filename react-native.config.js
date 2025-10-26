module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath: 'import com.tuanpm.RCTMqtt.RCTMqttPackage;',
      },
      ios: {
        project: './ios/RCTMqtt.xcodeproj',
      },
    },
  },
};

