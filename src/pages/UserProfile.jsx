import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LogOut, Moon, Sun, Search, Filter } from 'lucide-react';

const UserProfile = () => {
  const [theme, setTheme] = React.useState('light');
  
  // Mock user data
  const userData = {
    name: 'sandeep',
    email: 'sandeep@gmail.com',
    profileImage: 'https://www.shutterstock.com/image-photo/living-coral-color-year-2019-260nw-1250940526.jpg',
    borrowedBooks: [
      { id: 1, title: 'The Great Gatsby', dueDate: '2025-03-01' },
      { id: 2, title: '1984', dueDate: '2025-02-28' },
    ],
    wishlist: [
      { id: 1, title: 'Dune', author: 'Frank Herbert' },
      { id: 2, title: 'Foundation', author: 'Isaac Asimov' },
    ],
    myBooks: [
      { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
      { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Classic' },
    ],
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="rounded-full w-24 h-24"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="borrowing">My Borrowing</TabsTrigger>
          <TabsTrigger value="wishlist">My Wishlist</TabsTrigger>
          <TabsTrigger value="books">My Books</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input defaultValue={userData.name} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue={userData.email} />
                </div>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-gray-500">
                    Switch between light and dark mode
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeToggle}
                  />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrowing">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Borrowed Books</h3>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {userData.borrowedBooks.map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-gray-500">Due: {book.dueDate}</p>
                    </div>
                    <Button variant="outline">Return</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search wishlist..."
                    className="flex-1"
                    type="search"
                  />
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
                {userData.wishlist.map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-gray-500">By {book.author}</p>
                    </div>
                    <Button variant="outline">Remove</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="books">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search your books..."
                    className="flex-1"
                    type="search"
                  />
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                {userData.myBooks.map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-gray-500">
                        By {book.author} • {book.genre}
                      </p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;