import { useState, useEffect, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { AgencyService } from '@/services/AgencyService';
import { AgencyContact } from '@/types/agency';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, RefreshCw, FileText, Building2, User, Calendar, Filter, X, Download, FileSpreadsheet, FileText as FileTextIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exportToExcel, exportToPDF } from '@/utils/exportUtils';

const Report = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<AgencyContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  // Filter states
  const [filters, setFilters] = useState({
    agencyName: '',
    name: '',
    dateFrom: '',
    dateTo: '',
  });

  const fetchContacts = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await AgencyService.getAllAgencyContacts();
      
      if (response.success && response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        // Normalize field names (handle both snake_case and camelCase)
        const normalizedData = data.map((contact: any) => ({
          id: contact.id,
          firstName: contact.firstName || contact.first_name || '',
          lastName: contact.lastName || contact.last_name || '',
          agencyName: contact.agencyName || contact.agency_name || '',
          details: contact.details || '',
          createdAt: contact.createdAt || contact.created_at || '',
        }));
        setContacts(normalizedData);
      } else {
        setError('ไม่พบข้อมูล');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูล';
      setError(errorMessage);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // Filter contacts based on filter criteria
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // Filter by agency name
      if (filters.agencyName) {
        const agencyMatch = contact.agencyName
          .toLowerCase()
          .includes(filters.agencyName.toLowerCase());
        if (!agencyMatch) return false;
      }

      // Filter by name (first name or last name)
      if (filters.name) {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const nameMatch = fullName.includes(filters.name.toLowerCase());
        if (!nameMatch) return false;
      }

      // Filter by date range
      if (filters.dateFrom || filters.dateTo) {
        if (!contact.createdAt) return false;
        
        const contactDate = new Date(contact.createdAt);
        contactDate.setHours(0, 0, 0, 0);

        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom);
          fromDate.setHours(0, 0, 0, 0);
          if (contactDate < fromDate) return false;
        }

        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo);
          toDate.setHours(23, 59, 59, 999);
          if (contactDate > toDate) return false;
        }
      }

      return true;
    });
  }, [contacts, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      agencyName: '',
      name: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = filters.agencyName || filters.name || filters.dateFrom || filters.dateTo;

  const handleExportExcel = () => {
    try {
      exportToExcel(filteredContacts, 'agency-contacts-report');
      toast({
        title: 'สำเร็จ',
        description: 'ส่งออกไฟล์ Excel เรียบร้อยแล้ว',
      });
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถส่งออกไฟล์ Excel ได้',
        variant: 'destructive',
      });
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportToPDF(filteredContacts, 'agency-contacts-report');
      toast({
        title: 'สำเร็จ',
        description: 'ส่งออกไฟล์ PDF เรียบร้อยแล้ว',
      });
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถส่งออกไฟล์ PDF ได้',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-gray-900">
                  รายงานข้อมูล Agency Contacts
                </h1>
                <p className="text-gray-600 mt-1">
                  ข้อมูลที่ Agency กรอกผ่านระบบ
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={isLoading || filteredContacts.length === 0}
                    variant="outline"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    ส่งออกข้อมูล
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleExportExcel}
                    disabled={filteredContacts.length === 0}
                    className="gap-2"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    ส่งออกเป็น Excel (.xlsx)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleExportPDF}
                    disabled={filteredContacts.length === 0}
                    className="gap-2"
                  >
                    <FileTextIcon className="h-4 w-4" />
                    ส่งออกเป็น PDF (.pdf)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={fetchContacts}
                disabled={isLoading}
                variant="outline"
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                รีเฟรชข้อมูล
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>
                {hasActiveFilters ? (
                  <>
                    แสดง {filteredContacts.length} จาก {contacts.length} รายการ
                  </>
                ) : (
                  <>ทั้งหมด {contacts.length} รายการ</>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <CardTitle>ตัวกรองข้อมูล</CardTitle>
              </div>
              {hasActiveFilters && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  ล้างตัวกรอง
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Agency Name Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  ชื่อ Agency
                </label>
                <Input
                  placeholder="ค้นหาชื่อ Agency..."
                  value={filters.agencyName}
                  onChange={(e) => handleFilterChange('agencyName', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Name Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  ชื่อ-นามสกุล
                </label>
                <Input
                  placeholder="ค้นหาชื่อ-นามสกุล..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Date From Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  วันที่เริ่มต้น
                </label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Date To Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  วันที่สิ้นสุด
                </label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full"
                  min={filters.dateFrom}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
              </div>
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchContacts} variant="outline">
                  ลองอีกครั้ง
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : contacts.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">ยังไม่มีข้อมูล</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>รายการ Agency Contacts</CardTitle>
              <CardDescription>
                {hasActiveFilters ? (
                  <>แสดง {filteredContacts.length} จาก {contacts.length} รายการ</>
                ) : (
                  <>ข้อมูลทั้งหมด {contacts.length} รายการ</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">#</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          ชื่อ-นามสกุล
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          ชื่อ Agency
                        </div>
                      </TableHead>
                      <TableHead>รายละเอียด</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          วันที่บันทึก
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          ไม่พบข้อมูลที่ตรงกับตัวกรอง
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContacts.map((contact, index) => (
                      <TableRow key={contact.id || index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{contact.agencyName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            {contact.details ? (
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {contact.details}
                              </p>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            {formatDate(contact.createdAt)}
                          </div>
                        </TableCell>
                      </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Report;
