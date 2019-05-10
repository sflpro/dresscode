import React from 'react';
import { storiesOf } from '@storybook/react';

import styles from './typographyStory.css';
import { ItemGroup } from '../ItemGroup';

storiesOf('Typography', module)
  .add('Examples', () => {
    document.documentElement.classList.add('font-base');

    return (
      <>
        <ItemGroup
          title='Instruction'
        >
          <h4>In postcss.config.js add postcss-mixins</h4>
          <pre style={{ color: 'green' }}>
            {`module.exports = {
  plugins: {
    'postcss-mixins': {
      mixinsFiles: [
        'src/mixins/typography.css',
      ],
    }
  }
},`
            }
          </pre>
        </ItemGroup>
        <ItemGroup
          title='Usage'
        >
          <h4>In your CSS file add </h4>
          <span style={{ color: 'green' }}>
            Add .font-base class to &lt;html&gt; tag
          </span>
          <pre style={{ color: 'green' }}>
            {`.className {
  @mixin heading-2;
}`
            }
          </pre>
        </ItemGroup>
        <ItemGroup
          title='Examples'
        >
          <h1 className={styles.h1}>
            Heading 1
          </h1>
          <h2 className={styles.h2}>
            Heading 2
          </h2>
          <h3 className={styles.h3}>
            Heading 3
          </h3>
          <h4 className={styles.h4}>
            Heading 4
          </h4>
          <h5 className={styles.h5}>
            Heading 5
          </h5>
          <p className={styles.paragraph}>
            Paragraph
          </p>
          <p className={styles.paragraphSmall}>
            Paragraph small
          </p>
        </ItemGroup>
      </>
    );
  });
