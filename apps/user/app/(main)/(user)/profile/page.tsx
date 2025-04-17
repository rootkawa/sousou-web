import ChangePassword from './change-password';

export default function Page() {
  return (
    <div className='flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:*:flex-auto'>
      {/* <ThirdPartyAccounts />
      <NotifySettings /> */}
      <ChangePassword />
    </div>
  );
}
