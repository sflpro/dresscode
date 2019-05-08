import React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemGroup } from '../ItemGroup';

import styles from './grid.css';

storiesOf('Grids', module)
  .add('Examples', () => (
    <>
      <ItemGroup
        title='Instruction'
      >
        <h4>In postcss.config.js add postcss-mixins</h4>
        <pre style={{ color: 'green' }}>
          {`
            module.exports = {
              plugins: {
                'postcss-mixins': {
                  mixinsFiles: 'src/mixins/grid.css',
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
        <pre style={{ color: 'green' }}>
          {`
            .block {
                @mixin grid-container;
            }`
          }
        </pre>
        <pre style={{ color: 'green' }}>
          {`
            .element {
                @mixin grid-column 1/3;
            }`
          }
        </pre>
      </ItemGroup>
      <ItemGroup
        title=''
      >
        <h1>Examples</h1>
      </ItemGroup>
      <ItemGroup
        title='Grid 1/3'
      >
        <div className={styles.gridContainer}>
          <div className={styles.gridWrapper1}>
            <div className={styles.gridItem}>@mixin grid-column 1/3</div>
          </div>
          <div className={styles.gridWrapper1}>
            <div className={styles.gridItem}>@mixin grid-column 1/3</div>
          </div>
          <div className={styles.gridWrapper1}>
            <div className={styles.gridItem}>@mixin grid-column 1/3</div>
          </div>
          <div className={styles.gridWrapper1}>
            <div className={styles.gridItem}>@mixin grid-column 1/3</div>
          </div>
        </div>
      </ItemGroup>
      <ItemGroup
        title='Grid 1/2'
      >
        <div className={styles.gridContainer}>
          <div className={styles.gridWrapper2}>
            <div className={styles.gridItem}>@mixin grid-column 1/2</div>
          </div>
          <div className={styles.gridWrapper2}>
            <div className={styles.gridItem}>@mixin grid-column 1/2</div>
          </div>
          <div className={styles.gridWrapper2}>
            <div className={styles.gridItem}>@mixin grid-column 1/2</div>
          </div>
          <div className={styles.gridWrapper2}>
            <div className={styles.gridItem}>@mixin grid-column 1/2</div>
          </div>
          <div className={styles.gridWrapper2}>
            <div className={styles.gridItem}>@mixin grid-column 1/2</div>
          </div>
        </div>
      </ItemGroup>
      <ItemGroup
        title='Grid 1'
      >
        <div className={styles.gridContainer}>
          <div className={styles.gridWrapper3}>
            <div className={styles.gridItem}>@mixin grid-column 1</div>
          </div>
          <div className={styles.gridWrapper3}>
            <div className={styles.gridItem}>@mixin grid-column 1</div>
          </div>
          <div className={styles.gridWrapper3}>
            <div className={styles.gridItem}>@mixin grid-column 1</div>
          </div>
        </div>
      </ItemGroup>
      <ItemGroup
        title='Grid 1/3'
      >
        <div className={styles.gridContainer}>
          <div className={styles.gridWrapper4}>
            <div className={styles.gridItem}>@mixin grid-column offset 1/3</div>
          </div>
          <div className={styles.gridWrapper5}>
            <div className={styles.gridItem}>@mixin grid-column offset 2/3</div>
          </div>
        </div>
      </ItemGroup>
      <ItemGroup
        title='Grid 1/4'
      >
        <div className={styles.gridContainer}>
          <div className={styles.gridWrapper6}>
            <div className={styles.gridItem}>@mixin grid-column offset 1/2</div>
          </div>
          <div className={styles.gridWrapper7}>
            <div className={styles.gridItem}>@mixin grid-column offset 1/4</div>
          </div>
          <div className={styles.gridWrapper8}>
            <div className={styles.gridItem}>@mixin grid-column offset 3/4</div>
          </div>
        </div>
      </ItemGroup>
    </>
  ));
