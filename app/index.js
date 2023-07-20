const Yeoman = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');

function isStandalone(props) {
  return props.type === 'standalone';
}

function isNullType(props){
  return !(props.naked)
}

function isPolymer(props) {
  return props.framework === 'polymer';
}

function generateClassName(name) {
  return name.split('-').reduce((previous, part) => {
    return previous + part.charAt(0).toUpperCase() + part.slice(1);
  }, '');
}

class GeneratorWebComponent extends Yeoman {
  PROMPTS = [];
  initializing() {
    this.PROMPTS = [
      {
        name: 'type',
        type: 'list',
        choices: [
          { name: 'Standalone', value: 'standalone' },
          { name: 'Part of an app', value: 'naked' }
        ],
        when: !(this.options.naked),
        //default:'naked',
        required: true,
        message: 'Is this a standalone element, or part of an app?'
      },
      {
        name: 'name',
        type: 'input',
        required: true,
        message: 'Give it a tag name (min two words separated by dashes)',
        validate: str => /^([a-z])(?!.*[<>])(?=.*-).+$/.test(str),
        when:!(this.options.name)
        //default:this.options.name
      },
      {
        name: 'description',
        when: isStandalone,
        type: 'input',
        message: 'Tell me all about it...'
      },
      {
        name: 'framework',
        type: 'list',
        choices: [
          { name: 'Polymer 2', value: 'polymer' },
          { name: 'No framework', value: 'none' }
        ],
        required: true,
        message: 'Which WC framework do you want to include?',
        when: !(this.options.framework)
      },
      {
        name: 'includeTemplate',
        //    when: isPolymer,
        when: !(this.options.includeTemplate),
        type: 'confirm',
        message: 'Will your element need a shadow DOM template?',
        default: true
      },
      {
        name: 'author',
        when: isStandalone,
        type: 'input',
        required: true,
        message: 'Who wrote it?'
      },
      {
        name: 'github',
        when: isStandalone,
        type: 'input',
        required: true,
        message: 'What GitHub org will it live in?'
      }
    ];
  }

  constructor (args, opts){
    super(args,opts)
    this.option("name", {desc: 'Web Component name', type: String, default: "web-component"  });
    this.option("framework", {desc: 'Framework', type: String, default: "none"  });
    this.option("includeTemplate", {desc: 'Include shadow DOM', type: Boolean  });
    this.option("naked", {desc: 'Single component', type: Boolean, default: false });
  }


  prompting() {
    const done = this.async();

    return this.prompt(this.PROMPTS).then(answers => {
      this.props = {...answers, ...(this.options)};
      done();
    });
  }

  default() {
    const { name, type } = this.props;

    // Build component class
    this.props.class = generateClassName(name);

    // Ensure component is in its own directory if standalone
    if (type === 'standalone' && path.basename(this.destinationPath()) !== name) {
      this.log(`Your component should be in a '${name}' folder, I'll create it for you`);
      mkdirp(name);
      this.destinationRoot(this.destinationPath(name));
    }
  }

  writing() {
    const { name } = this.props;

    // Write & rename element src
    /*    this.fs.copyTpl(*/
    /*this.templatePath('element.html'),*/
    /*this.destinationPath(`${name}.html`),*/
    /*this*/
    /*);*/
    this.fs.copyTpl(
      this.templatePath('element.js'),
      this.destinationPath(`${name}.js`),
      this
    );
    this.fs.copyTpl(
      this.templatePath('element.css'),
      this.destinationPath(`${name}.css`),
      this
    );


    // Write additional files only for standalone elements
    if (!isStandalone(this.props)) {
      return;
    }

    // Write & rename element test
    this.fs.copyTpl(
      this.templatePath('element-test.html'),
      this.destinationPath(`test/${name}.html`),
      this
    );

    // Write everything else
    this.fs.copyTpl(
      glob.sync(this.templatePath('!(element.js|element.html|element-test.html)'), { dot: true }),
      this.destinationPath(),
      this
    );
  }

  install() {
    isStandalone(this.props) && this.installDependencies();
  }
}

module.exports = GeneratorWebComponent;
