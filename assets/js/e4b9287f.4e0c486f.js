(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[797],{6438:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return u},default:function(){return c}});var a=n(2122),r=n(9756),i=(n(7294),n(3905)),o=["components"],s={sidebar_position:1},l=void 0,p={unversionedId:"Getting Started",id:"Getting Started",isDocsHomePage:!1,title:"Getting Started",description:"Install Dependencies",source:"@site/docs/Getting Started.md",sourceDirName:".",slug:"/Getting Started",permalink:"/morphling/docs/Getting Started",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/Getting Started.md",version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Flaging Component",permalink:"/morphling/docs/tutorial-basics/flaging-component"}},u=[{value:"Install Dependencies",id:"install-dependencies",children:[]},{value:"Setup Feature Flags ( gitlab )",id:"setup-feature-flags--gitlab-",children:[{value:"1. Open Operations menu in sidebar and click <strong>Feature Flags</strong>",id:"1-open-operations-menu-in-sidebar-and-click-feature-flags",children:[]},{value:"2. Click configure button",id:"2-click-configure-button",children:[]}]},{value:"Setup Provider ( React )",id:"setup-provider--react-",children:[]}],g={toc:u};function c(e){var t=e.components,s=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},g,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"install-dependencies"},"Install Dependencies"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @warungpintar/morphling-core @warungpintar/morphling-unleash-adapter @warungpintar/morphling-react\n")),(0,i.kt)("h2",{id:"setup-feature-flags--gitlab-"},"Setup Feature Flags ( gitlab )"),(0,i.kt)("h3",{id:"1-open-operations-menu-in-sidebar-and-click-feature-flags"},"1. Open Operations menu in sidebar and click ",(0,i.kt)("strong",{parentName:"h3"},"Feature Flags")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"locate feature toggle menu",src:n(6439).Z})),(0,i.kt)("h3",{id:"2-click-configure-button"},"2. Click configure button"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"locate feature toggle menu",src:n(7085).Z})),(0,i.kt)("p",null,"after clicking ",(0,i.kt)("strong",{parentName:"p"},"configure button")," now you should see modal that shows ",(0,i.kt)("strong",{parentName:"p"},"url")," and ",(0,i.kt)("strong",{parentName:"p"},"instanceId")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"locate feature toggle menu",src:n(1650).Z})),(0,i.kt)("p",null,"copy that ",(0,i.kt)("strong",{parentName:"p"},"api url")," and ",(0,i.kt)("strong",{parentName:"p"},"instanceId")," to used in Provider"),(0,i.kt)("h2",{id:"setup-provider--react-"},"Setup Provider ( React )"),(0,i.kt)("p",null,"open your root component to setup morphling provider, for example ",(0,i.kt)("inlineCode",{parentName:"p"},"Nextjs")," use ",(0,i.kt)("inlineCode",{parentName:"p"},"pages/_app.tsx")),(0,i.kt)("p",null,"lets pretend this is the config that we got after setting up gitlab unleash from previous step"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"apiUrl=https://gitlab.warungpintar.co/api/v4/feature_flags/unleash/101\ninstanceId=sSgwm_mP7sH-kjasdhs\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport { FeatureToggleProvider } from '@warungpintar/morphling-react';\nimport Unleash, {\n  Metadata,\n  IConfig,\n} from '@warungpintar/morphling-adapter-unleash';\nimport FeatureToggle, { IFeatureToggle } from '@warungpintar/morphling-core';\n\nconst config: IConfig = {\n  url: 'https://gitlab.warungpintar.co/api/v4/feature_flags/unleash/101',\n  instanceId: 'sSgwm_mP7sH-kjasdhs',\n  // appName is environment\n  appName: process.env.NODE_ENV ?? 'staging',\n};\n\nconst featureToggleClient: IFeatureToggle<Metadata> = new FeatureToggle({\n  adapter: new Unleash(config),\n  strategy: {\n    type: 'init',\n  },\n});\n\nconst App = (props) => {\n  return (\n    <FeatureToggleProvider adapter={featureToggleClient}>\n      {props.children}\n    </FeatureToggleProvider>\n  );\n};\n")))}c.isMDXComponent=!0},7085:function(e,t,n){"use strict";t.Z=n.p+"assets/images/configure-button-2a558bef9e821e68f477deb334447d1e.png"},6439:function(e,t,n){"use strict";t.Z=n.p+"assets/images/locate-feature-toggle-menu-2ac45cab83660ee1392cd136db0ebb37.png"},1650:function(e,t,n){"use strict";t.Z=n.p+"assets/images/modal-e159d287ed6c41436eaa7661716448e4.png"}}]);