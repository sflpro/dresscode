import React from 'react';
import { storiesOf } from '@storybook/react';

import { ItemGroup } from '../ItemGroup';

import styles from './grid.css';

storiesOf('Grids', module)
  .add('Examples', () => (
    <>
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
