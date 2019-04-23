import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.css';

export function ImportInstructionItem({
  componentName,
  prefix,
  ...props
}) {
  return (
    <pre
      className={styles.importBlock}
      {...props}
    >
      <span className={styles.keyword}>
          import&nbsp;
      </span>
      {`{ ${componentName} } `}
      <span className={styles.keyword}>
        from&nbsp;
      </span>
      <span className={styles.string}>
        {prefix ? `'@sfl/ui-library/lib/${componentName}'`
          : '\'@sfl/ui-library\''
        }
      </span>
    </pre>
  );
}

ImportInstructionItem.propTypes = {
  componentName: PropTypes.string,
  prefix: PropTypes.bool,
};

ImportInstructionItem.defaultProps = {
  componentName: '',
  prefix: true,
};

export function ImportInstruction({
  componentName,
  ...props
}) {
  return (
    <div
      className={styles.ImportInstruction}
      {...props}
    >
      <h1>Usage</h1>
      <ImportInstructionItem componentName={componentName} />
      <h3>OR</h3>
      <ImportInstructionItem componentName={componentName} prefix={false} />
    </div>
  );
}

ImportInstruction.propTypes = {
  componentName: PropTypes.string,
};

ImportInstruction.defaultProps = {
  componentName: '',
};
