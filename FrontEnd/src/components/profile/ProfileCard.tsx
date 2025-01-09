{/*new edit by jissin */}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useEffect } from 'react';
import { db,auth } from '../../pages/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('personal');
  const [medicalHistoryOpen, setMedicalHistoryOpen] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [userName, setUserName] = useState<string>('Loading...');
  const [userId, setUserId] = useState<string | null>(null);
  const [firstName, lastName] = userName.split(' ', 2);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        setUserId(user.uid);

        try {
          const userDoc = await getDoc(doc(db, 'Users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || 'Unknown User');
          } else {
            console.error('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-2 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=160&h=160&q=80"
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userId}: #12345 • Member since 2024
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'primary' : 'outline'}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {['personal', 'medical', 'emergency'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  selectedTab === tab
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
              </button>
            ))}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            {selectedTab === 'personal' && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                    </label>
                    <input
                    type="text"
                    disabled={!isEditing}
                    value={firstName || ''}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-white-900"
                    onChange={(e) => {
                        if (isEditing) {
                        setUserName(`${e.target.value} ${lastName || ''}`);
                        }
                    }}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                    </label>
                    <input
                    type="text"
                    disabled={!isEditing}
                    value={lastName || ''}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-white-900"
                    onChange={(e) => {
                        if (isEditing) {
                        setUserName(`${firstName || ''} ${e.target.value}`);
                        }
                    }}
                    />
                </div>
                {/* Add more personal fields */}
              </div>
            )}

            {selectedTab === 'medical' && (
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setMedicalHistoryOpen(!medicalHistoryOpen)}
                    className="flex w-full items-center justify-between p-4"
                  >
                    <span className="font-medium ">Medical History</span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform ${
                        medicalHistoryOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {medicalHistoryOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                          {/* Medical history content */}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {selectedTab === 'emergency' && (
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.relationship}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        setEmergencyContacts(contacts =>
                          contacts.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() =>
                    setEmergencyContacts(contacts => [
                      ...contacts,
                      { name: '', relationship: '', phone: '' },
                    ])
                  }
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Emergency Contact
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}