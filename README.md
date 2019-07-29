# @SFL Modern React UI library

# Usage

## Installation

First follow instructions [here](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry) to be able to pull from [Github Package Registry](https://github.com/features/package-registry). Recommended way is adding `NPM_TOKEN` as a global environment variable with a value of an access token generated from [here](https://github.com/settings/tokens) that has "read:package" scope enabled. Also in your user directory's `.npmrc` file add:

```
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

After that you can install the library.

```sh
npm install @banqr-io/ui-library
```

## Using components

```javascript
import { Label, TextInput, Icon, Button } from '@banqr-io/ui-library';
```
or
```javascript
import { Label } from '@banqr-io/ui-library/lib/Label';
import { TextInput } from '@banqr-io/ui-library/lib/TextInput';
import { Icon } from '@banqr-io/ui-library/lib/Icon';
import { Button } from '@banqr-io/ui-library/lib/Button';
```

# Development

### Installation

```sh
1. git clone https://github.com/banqr-io/banqr-ui-common.git
2. npm install
3. npm run build
4. npm run storybook
```

The projects follows [Angular.js commit message guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). This allows to use [semantic-release](https://github.com/semantic-release/semantic-release) for automated semantic release management.

