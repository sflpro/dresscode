import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.css';

export function ImportInstructionItem({
  text,
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
      {`{ ${text} } `}
      <span className={styles.keyword}>
        from&nbsp;
      </span>
      <span className={styles.string}>
        {prefix ? `'@sfl/ui-library/lib/${text}'`
          : '\'@sfl/ui-library\''
        }
      </span>
    </pre>
  );
}

ImportInstructionItem.propTypes = {
  text: PropTypes.string,
  prefix: PropTypes.bool,
};

ImportInstructionItem.defaultProps = {
  text: '',
  prefix: true,
};

export function ImportInstruction({
  text,
  ...props
}) {
  return (
    <div
      className={styles.ImportInstruction}
      {...props}
    >
      <h1>Usage</h1>
      <ImportInstructionItem text={text} />
      <h3>OR</h3>
      <ImportInstructionItem text={text} prefix={false} />
    </div>
  );
}

ImportInstruction.propTypes = {
  text: PropTypes.string,
};

ImportInstruction.defaultProps = {
  text: '',
};
