
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onSubmit: () => void;
}

const ApiKeyInput = ({ apiKey, setApiKey, onSubmit }: ApiKeyInputProps) => {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Google Maps API Key Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            To display the interactive map, please enter your Google Maps API key. 
            You can get one from the Google Cloud Console.
          </p>
          <div className="space-y-2">
            <Label htmlFor="apiKey">Google Maps API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <Button onClick={onSubmit} className="w-full">
            Load Map
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Get your API key at: console.cloud.google.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyInput;
