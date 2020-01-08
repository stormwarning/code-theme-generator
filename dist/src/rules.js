"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGlobalSettingGenerator(name) {
    return (color) => {
        if (!color) {
            return undefined;
        }
        const result = {};
        result[name] = color;
        return result;
    };
}
function getSimpleColorGenerator(name, scope, fontStyle = 0 /* NONE */) {
    return (color) => {
        let colorRule = {
            name: name,
            scope: scope,
            settings: {
                foreground: color
            }
        };
        let fontStyles = [];
        if (fontStyle & 1 /* ITALIC */) {
            fontStyles.push('italic');
        }
        if (fontStyle & 2 /* BOLD */) {
            fontStyles.push('bold');
        }
        if (fontStyle & 4 /* UNDERLINE */) {
            fontStyles.push('underline');
        }
        if (fontStyles.length > 0) {
            colorRule.settings.fontStyle = fontStyles.join(' ');
        }
        return colorRule;
    };
}
exports.globalRules = [
    {
        color: s => s.base.background,
        generate: getGlobalSettingGenerator('background')
    },
    {
        color: s => s.base.foreground,
        generate: getGlobalSettingGenerator('foreground')
    }
];
exports.tokenRules = [
    // String: It's important that string is put first so that other scopes can override strings
    // within template expressions
    {
        color: s => s.syntax.string,
        generate: getSimpleColorGenerator('String', 'string')
    },
    {
        color: s => s.syntax.punctuation,
        generate: getSimpleColorGenerator('Punctuation', 'punctuation, punctuation.definition.string')
    },
    {
        color: s => s.syntax.stringEscape,
        generate: getSimpleColorGenerator('String Escape', 'constant.character.escape, text.html constant.character.entity.named, punctuation.definition.entity.html')
    },
    {
        color: s => s.syntax.boolean,
        generate: getSimpleColorGenerator('Boolean', 'constant.language.boolean')
    },
    {
        color: s => s.syntax.number,
        generate: getSimpleColorGenerator('Number', 'constant.numeric')
    },
    {
        color: s => s.syntax.variable,
        generate: getSimpleColorGenerator('Variable', 'variable, variable.parameter, support.variable, support.constant, meta.definition.variable entity.name.function')
    },
    {
        color: s => s.syntax.otherKeyword,
        generate: getSimpleColorGenerator('Other Keyword', 'keyword.other')
    },
    // Support.type.object: module.exports (ts)
    {
        color: s => s.syntax.keyword,
        generate: getSimpleColorGenerator('Keyword', 'keyword, modifier, variable.language.this, support.type.object, constant.language')
    },
    // Support.function: eg. join in path.join in TypeScript
    {
        color: s => s.syntax.functionCall,
        generate: getSimpleColorGenerator('Function call', 'entity.name.function, support.function')
    },
    // Storage.type: var (ts)
    // storage.modifier: private (ts)
    {
        color: s => s.syntax.storage,
        generate: getSimpleColorGenerator('Storage', 'storage.type, storage.modifier')
    },
    // Module.support: imported modules in TypeScript
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('Modules', 'support.module, support.node', 1 /* ITALIC */)
    },
    // Support.type: `boolean` (ts)
    {
        color: s => s.syntax.type,
        generate: getSimpleColorGenerator('Type', 'support.type')
    },
    // Entity.name.type: `: SomeType` (ts)
    {
        color: s => s.syntax.type,
        generate: getSimpleColorGenerator('Type', 'entity.name.type, entity.other.inherited-class')
    },
    {
        color: s => s.syntax.comment,
        generate: getSimpleColorGenerator('Comment', 'comment, punctuation.definition.comment', 1 /* ITALIC */)
    },
    {
        color: s => s.syntax.class,
        generate: getSimpleColorGenerator('Class', 'entity.name, entity.name.type.class, support.type, support.class, support.orther.namespace, meta.use', 0 /* NONE */)
    },
    // Variable.object.property: `class A { meth = 0; }` (ts)
    // meta.field.declaration entity.name.function: `class A { meth = () => 0; }` (ts)
    {
        color: s => s.syntax.classMember,
        generate: getSimpleColorGenerator('Class variable', 'variable.object.property, meta.field.declaration entity.name.function')
    },
    // Meta.definition.method entity.name.function: `class A { meth() {} }` (ts)
    {
        color: s => s.syntax.classMember,
        generate: getSimpleColorGenerator('Class method', 'meta.definition.method entity.name.function')
    },
    {
        color: s => s.syntax.function,
        generate: getSimpleColorGenerator('Function definition', 'meta.function entity.name.function')
    },
    // Punctuation.definition.template-expression: `${}`
    {
        color: s => s.syntax.keyword,
        generate: getSimpleColorGenerator('Template expression', 'template.expression.begin, template.expression.end, punctuation.definition.template-expression.begin, punctuation.definition.template-expression.end')
    },
    {
        color: s => s.syntax.punctuation,
        generate: getSimpleColorGenerator('Punctuation', 'punctuation.accessor, punctuation.separator, punctuation.definition')
    },
    {
        color: s => s.base.foreground,
        generate: getSimpleColorGenerator('Reset embedded/template expression colors', 'meta.embedded, source.groovy.embedded, meta.template.expression')
    },
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('YAML key', 'entity.name.tag.yaml')
    },
    // Modifier: This includes things like access modifiers, static, readonly, etc.
    {
        color: s => s.syntax.modifier,
        generate: getSimpleColorGenerator('Modifier', 'modifier')
    },
    /**
     * JSON
     */
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('JSON key', 'meta.object-literal.key, meta.object-literal.key string, support.type.property-name.json')
    },
    {
        color: s => s.syntax.keyword,
        generate: getSimpleColorGenerator('JSON constant', 'constant.language.json')
    },
    /**
     * CSS
     */
    {
        color: s => s.syntax.cssClass,
        generate: getSimpleColorGenerator('CSS class', 'entity.other.attribute-name.class')
    },
    {
        color: s => s.syntax.cssId,
        generate: getSimpleColorGenerator('CSS ID', 'entity.other.attribute-name.id')
    },
    {
        color: s => s.syntax.cssTag,
        generate: getSimpleColorGenerator('CSS tag', 'source.css entity.name.tag')
    },
    /**
     * HTML
     */
    {
        color: s => s.syntax.keyword,
        generate: getSimpleColorGenerator('HTML tag outer', 'meta.tag, punctuation.definition.tag')
    },
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('HTML tag inner', 'entity.name.tag')
    },
    {
        color: s => s.syntax.storage,
        generate: getSimpleColorGenerator('HTML tag attribute', 'entity.other.attribute-name')
    },
    /**
     * Markdown
     */
    {
        color: s => s.syntax.keyword,
        generate: getSimpleColorGenerator('Markdown heading', 'markup.heading')
    },
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('Markdown link text', 'text.html.markdown meta.link.inline, meta.link.reference')
    },
    {
        color: s => s.syntax.markdownQuote,
        generate: getSimpleColorGenerator('Markdown block quote', 'text.html.markdown markup.quote')
    },
    {
        color: s => s.syntax.keyword,
        generate: getSimpleColorGenerator('Markdown list item', 'text.html.markdown beginning.punctuation.definition.list')
    },
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('Markdown italic', 'markup.italic', 1 /* ITALIC */)
    },
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('Markdown bold', 'markup.bold', 2 /* BOLD */)
    },
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('Markdown bold italic', 'markup.bold markup.italic, markup.italic markup.bold', 2 /* BOLD */ | 1 /* ITALIC */)
    },
    {
        color: s => s.syntax.string,
        generate: getSimpleColorGenerator('Markdown code block', 'markup.fenced_code.block.markdown punctuation.definition.markdown')
    },
    {
        color: s => s.syntax.string,
        generate: getSimpleColorGenerator('Markdown inline code', 'markup.inline.raw.string.markdown')
    },
    /**
     * Ini
     */
    {
        color: s => s.syntax.identifier,
        generate: getSimpleColorGenerator('INI property name', 'keyword.other.definition.ini')
    },
    {
        color: s => s.syntax.keyword,
        generate: getSimpleColorGenerator('INI section title', 'entity.name.section.group-title.ini')
    },
    /**
     * C#
     */
    {
        color: s => s.syntax.class,
        generate: getSimpleColorGenerator('C# class', 'source.cs meta.class.identifier storage.type', 0 /* NONE */)
    },
    {
        color: s => s.syntax.classMember,
        generate: getSimpleColorGenerator('C# class method', 'source.cs meta.method.identifier entity.name.function')
    },
    {
        color: s => s.syntax.functionCall,
        generate: getSimpleColorGenerator('C# function call', 'source.cs meta.method-call meta.method, source.cs entity.name.function')
    },
    {
        color: s => s.syntax.type,
        generate: getSimpleColorGenerator('C# type', 'source.cs storage.type')
    },
    {
        color: s => s.syntax.type,
        generate: getSimpleColorGenerator('C# return type', 'source.cs meta.method.return-type')
    },
    {
        color: s => s.syntax.comment,
        generate: getSimpleColorGenerator('C# preprocessor', 'source.cs meta.preprocessor')
    },
    {
        color: s => s.base.foreground,
        generate: getSimpleColorGenerator('C# namespace', 'source.cs entity.name.type.namespace')
    },
    /**
     * JSX
     */
    {
        color: s => s.base.foreground,
        generate: getSimpleColorGenerator('JSX Text', 'meta.jsx.children, source.js JSXNested', 0 /* NONE */)
    } // Normalize children text inside components/html elements
];
//# sourceMappingURL=rules.js.map