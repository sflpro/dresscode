import React from 'react';
import { storiesOf } from '@storybook/react';

import { Area } from '.';

import { ItemGroup } from '../helpers/ItemGroup';

storiesOf('Area', module)
  .add('Examples', () => (
    <>
      <ItemGroup
        title='Area'
        style={{ height: '100%' }}
      >
        <Area
          direction='vertical'
          fixed
        >
          <Area
            fit
          >
            <header
              style={{
                height: 40,
                backgroundColor: '#F2F1FB',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              header
            </header>
          </Area>
          <Area>
            <Area
              fit
            >
              <aside
                style={{
                  backgroundColor: '#EBFAF1',
                  width: 200,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                aside
              </aside>
            </Area>
            <Area
              direction='vertical'
            >
              <Area>
                <main
                  style={{
                    backgroundColor: '#FFEEEE',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                  }}
                >
                  main
                </main>
              </Area>
              <Area
                fit
              >
                <footer
                  style={{
                    backgroundColor: '#FFF2D7',
                    height: 80,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  footer
                </footer>
              </Area>
            </Area>
          </Area>
        </Area>
      </ItemGroup>
    </>
  ));
