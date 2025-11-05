import CardStage from '../CardStage';
import { Building2 } from 'lucide-react';
import UploadBox from '../UploadBox';

export default function CardStageExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardStage
        title="Entity Details"
        icon={Building2}
        status="completed"
        number={1}
      >
        <p className="text-sm text-muted-foreground">
          Company information verified
        </p>
      </CardStage>
      <CardStage
        title="Entity Details"
        icon={Building2}
        status="active"
        number={2}
      >
        <UploadBox label="Upload Document" accept=".pdf" />
      </CardStage>
      <CardStage
        title="Entity Details"
        icon={Building2}
        status="pending"
        number={3}
      >
        <p className="text-sm text-muted-foreground">
          Waiting for previous steps
        </p>
      </CardStage>
    </div>
  );
}
