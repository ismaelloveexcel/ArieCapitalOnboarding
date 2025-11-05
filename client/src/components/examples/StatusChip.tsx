import StatusChip from '../StatusChip';

export default function StatusChipExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <StatusChip status="verified" />
      <StatusChip status="warning" />
      <StatusChip status="rejected" />
      <StatusChip status="pending" />
    </div>
  );
}
