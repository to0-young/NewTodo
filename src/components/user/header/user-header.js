import React from 'react';

function UserHeader(props) {
  return (
    <div className="header">
      <div className="header__section">
        <div className="header__section_left">
          <div className="header__item header__logo">
            WRT
          </div>

          <div className="header__item header__button"><a href="#">test1</a></div>
          <div className="header__item header__button"><a href="#">test2</a></div>
          <div className="header__item header__button"><a href="#">test3</a></div>
          <div className="header__item header__button"><a href="#">test4</a></div>
          <div className="header__item header__button"><a href="#">test5</a></div>
        </div>

        <div className="header__section_right">
          <div className="header__item header__button"><a href="#">Log-out</a></div>
          <div className="header__item header__button"><a href="#">Log-out</a></div>
        </div>
      </div>
    </div>

  );
}

export default UserHeader;
