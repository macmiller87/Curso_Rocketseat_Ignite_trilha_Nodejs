module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }], // Preseta variaveis de anbiente, e a versão do node atula do projeto.
        "@babel/preset-typescript", // Preseta o typescript.
    ],
    plugins: [
        [
            "module-resolver", // Preseta as pastas do projeto, conforme foi setado no arquivo (tsconfig.json).
            {
                alias: {
                    "@modules": ["./src/modules"],
                    "@config": ["./src/config"],
                    "@shared": ["./src/shared"],
                    "@errors": ["./src/errors"],
                    "@utils": ["./src/utils"]
                },
            },
        ],
        "babel-plugin-transform-typescript-metadata", // Preseta a lib.
        ["@babel/plugin-proposal-decorators", { legacy: true }], // Preseta um parametro para dentro da lib.
        ["@babel/plugin-proposal-class-properties", { loose: true }], // Preseta um parametro para dentro da lib.
    ],
};



