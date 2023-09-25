import {TopBar, Frame} from '@shopify/polaris';

function TopBarE() {
  const logo = {
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999'
  };

  const userMenuMarkup = <TopBar.UserMenu name="Avada" initials="A" actions={null} />;

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <div style={{height: '80px'}}>
      <Frame topBar={topBarMarkup} logo={logo} />
    </div>
  );
}

export default TopBarE;
