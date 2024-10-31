import React, { useState, FormEvent } from 'react';
import { format } from "date-fns";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Textarea } from "./components/ui/textarea";
import { Calendar } from "./components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { CalendarIcon, Church } from "lucide-react";
import html2pdf from 'html2pdf.js';

function App() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    number: '',
    from: '',
    to: '',
    subject: '',
    requestType: 'servicos',
    otherRequestType: '',
    description: '',
    responsible: '',
    receivedBy: '',
    status: 'deferido',
    by: '',
    executedBy: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Generate PDF
    const element = document.getElementById('form-content');
    if (element) {
      const opt = {
        margin: 1,
        filename: 'church-form.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 px-[10vw] py-[10vh]">
        <div className="mb-8 flex items-center justify-center gap-4">
          <Church className="h-12 w-12 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Church Form</h1>
        </div>
        
        <div id="form-content" className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="number">Nº</Label>
                <Input 
                  id="number" 
                  value={formData.number}
                  onChange={handleInputChange}
                  className="mt-1"
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="from">De:</Label>
                <Input 
                  id="from" 
                  value={formData.from}
                  onChange={handleInputChange}
                  className="mt-1"
                  required 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="to">Para:</Label>
              <Input 
                id="to" 
                value={formData.to}
                onChange={handleInputChange}
                className="mt-1"
                required 
              />
            </div>

            <div>
              <Label htmlFor="subject">Assunto:</Label>
              <Input 
                id="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                className="mt-1"
                required 
              />
            </div>

            <div>
              <Label>Data:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Tipo de Solicitação:</Label>
              <RadioGroup 
                value={formData.requestType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, requestType: value }))}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="servicos" id="servicos" />
                  <Label htmlFor="servicos">Serviços</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="uso-instalacoes" id="uso-instalacoes" />
                  <Label htmlFor="uso-instalacoes">Uso das instalações da Igreja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compras" id="compras" />
                  <Label htmlFor="compras">Compras</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="uso-equipamento" id="uso-equipamento" />
                  <Label htmlFor="uso-equipamento">Uso de equipamento</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outros" id="outros" />
                  <Label htmlFor="outros">Outros:</Label>
                  <Input 
                    type="text" 
                    className="ml-2"
                    value={formData.otherRequestType}
                    onChange={(e) => setFormData(prev => ({ ...prev, otherRequestType: e.target.value }))}
                  />
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="description">Descrição:</Label>
              <Textarea 
                id="description" 
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1"
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="responsible">Responsável:</Label>
                <Input 
                  id="responsible" 
                  value={formData.responsible}
                  onChange={handleInputChange}
                  className="mt-1"
                  required 
                />
              </div>

              <div>
                <Label htmlFor="receivedBy">Recebido por:</Label>
                <Input 
                  id="receivedBy" 
                  value={formData.receivedBy}
                  onChange={handleInputChange}
                  className="mt-1"
                  required 
                />
              </div>
            </div>

            <div>
              <Label>Data Final:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Status:</Label>
              <RadioGroup 
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deferido" id="deferido" />
                  <Label htmlFor="deferido">Deferido</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="indeferido" id="indeferido" />
                  <Label htmlFor="indeferido">Indeferido</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="by">Por:</Label>
                <Input 
                  id="by" 
                  value={formData.by}
                  onChange={handleInputChange}
                  className="mt-1"
                  required 
                />
              </div>

              <div>
                <Label htmlFor="executedBy">Executado por:</Label>
                <Input 
                  id="executedBy" 
                  value={formData.executedBy}
                  onChange={handleInputChange}
                  className="mt-1"
                  required 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Generate PDF
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;