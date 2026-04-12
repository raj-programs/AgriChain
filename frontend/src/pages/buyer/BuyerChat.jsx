import DashboardLayout from '../../layouts/DashboardLayout';
import Chat from '../../components/Chat/Chat';

export default function BuyerChat() {
  return (
    <DashboardLayout>
      <div className="page-title">Chat</div>
      <div className="page-subtitle">Communicate directly with farmers</div>
      <Chat />
    </DashboardLayout>
  );
}
