import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Mail, Shield } from 'lucide-react';

export default function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
        
        <div className="grid gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Email:</span>
                </div>
                <span className="text-white">{currentUser.email}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Name:</span>
                </div>
                <span className="text-white">{currentUser.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Member since:</span>
                </div>
                <span className="text-white">
                  {new Date(currentUser.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Account type:</span>
                </div>
                <Badge variant={currentUser.isAdmin ? "default" : "secondary"}>
                  {currentUser.isAdmin ? 'Admin' : 'User'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Account Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">More features coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}