import tseslint from 'typescript-eslint';

export default tseslint.config(
    ...tseslint.configs.recommended,
    {
        ignores: [
            "lib/",
            "src/implementationGuides/reducedFHIRPath.ts",
            "src/implementationGuides/reducedXPath.ts"
        ],
    }
);