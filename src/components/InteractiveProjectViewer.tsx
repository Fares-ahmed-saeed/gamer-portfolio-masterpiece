
import React, { useState, useRef } from 'react';
import { ExternalLink, Github, Code, Play, Pause, RotateCcw, Maximize2, Eye, Heart, Star, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  demoUrl?: string;
  githubUrl: string;
  tech: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  features: string[];
  challenges: string[];
  codeSnippets: {
    language: string;
    code: string;
    description: string;
  }[];
  screenshots: string[];
  stats: {
    views: number;
    likes: number;
    downloads: number;
    stars: number;
  };
}

const projects: Project[] = [
  {
    id: '1',
    title: 'منصة التجارة الإلكترونية المتقدمة',
    description: 'منصة تجارة إلكترونية شاملة مع نظام دفع متكامل ولوحة تحكم إدارية',
    longDescription: 'منصة تجارة إلكترونية متكاملة تتضمن نظام إدارة المنتجات، سلة التسوق، نظام الدفع الآمن، وتتبع الطلبات. تم تطويرها باستخدام React و Node.js مع قاعدة بيانات MongoDB.',
    image: '🛒',
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/user/ecommerce',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Express'],
    category: 'Web Development',
    status: 'completed',
    features: [
      'نظام دفع آمن متعدد الطرق',
      'إدارة المخزون التلقائية',
      'تتبع الطلبات في الوقت الفعلي',
      'لوحة تحكم إدارية متقدمة',
      'نظام تقييم المنتجات',
      'إشعارات فورية للعملاء'
    ],
    challenges: [
      'تحسين أداء قاعدة البيانات',
      'أمان المدفوعات الإلكترونية',
      'تصميم واجهة مستخدم متجاوبة',
      'إدارة حالة التطبيق المعقدة'
    ],
    codeSnippets: [
      {
        language: 'javascript',
        code: `// Payment processing middleware
const processPayment = async (req, res, next) => {
  try {
    const { amount, currency, paymentMethod } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      payment_method: paymentMethod,
      confirm: true,
    });
    
    req.paymentResult = paymentIntent;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};`,
        description: 'معالج الدفع الآمن باستخدام Stripe'
      },
      {
        language: 'javascript',
        code: `// Real-time inventory management
const updateInventory = (productId, quantity) => {
  return {
    type: 'UPDATE_INVENTORY',
    payload: { productId, quantity }
  };
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INVENTORY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.productId
            ? { ...product, stock: product.stock - action.payload.quantity }
            : product
        )
      };
    default:
      return state;
  }
};`,
        description: 'نظام إدارة المخزون باستخدام Redux'
      }
    ],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg', 'screenshot3.jpg'],
    stats: {
      views: 2450,
      likes: 189,
      downloads: 67,
      stars: 234
    }
  },
  {
    id: '2',
    title: 'تطبيق إدارة المهام الذكي',
    description: 'تطبيق ذكي لإدارة المهام مع تتبع الوقت وتحليلات الإنتاجية',
    longDescription: 'تطبيق إدارة مهام متقدم يستخدم الذكاء الاصطناعي لتحليل أنماط العمل وتقديم اقتراحات لتحسين الإنتاجية.',
    image: '📋',
    demoUrl: 'https://example.com/tasks-demo',
    githubUrl: 'https://github.com/user/task-manager',
    tech: ['React', 'TypeScript', 'Firebase', 'Chart.js', 'PWA'],
    category: 'Productivity',
    status: 'in-progress',
    features: [
      'تتبع الوقت الذكي',
      'تحليلات الإنتاجية المتقدمة',
      'مزامنة عبر الأجهزة',
      'إشعارات ذكية',
      'العمل بدون انترنت',
      'تقارير مفصلة'
    ],
    challenges: [
      'تزامن البيانات عبر الأجهزة',
      'خوارزميات تحليل الإنتاجية',
      'تحسين أداء PWA',
      'واجهة مستخدم بديهية'
    ],
    codeSnippets: [
      {
        language: 'typescript',
        code: `interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  estimatedTime: number;
  actualTime?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

class TaskManager {
  private tasks: Task[] = [];
  
  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.tasks.push(newTask);
    return newTask;
  }
  
  updateTask(id: string, updates: Partial<Task>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;
    
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    return this.tasks[taskIndex];
  }
}`,
        description: 'نظام إدارة المهام بـ TypeScript'
      }
    ],
    screenshots: ['task-screenshot1.jpg', 'task-screenshot2.jpg'],
    stats: {
      views: 1890,
      likes: 156,
      downloads: 45,
      stars: 178
    }
  }
];

export function InteractiveProjectViewer() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startSlideshow = () => {
    if (!selectedProject || selectedProject.screenshots.length <= 1) return;
    
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentScreenshot(prev => 
        prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1
      );
    }, 3000);
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetSlideshow = () => {
    stopSlideshow();
    setCurrentScreenshot(0);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('overview');
    setCurrentScreenshot(0);
    stopSlideshow();
  };

  return (
    <div className="space-y-6">
      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className={`gaming-card cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedProject?.id === project.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleProjectSelect(project)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{project.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {project.stats.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {project.stats.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {project.stats.stars}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {project.stats.downloads}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Project View */}
      {selectedProject && (
        <Card className="gaming-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{selectedProject.image}</div>
                <div>
                  <CardTitle className="text-2xl">{selectedProject.title}</CardTitle>
                  <p className="text-muted-foreground">{selectedProject.longDescription}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                إغلاق
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="features">الميزات</TabsTrigger>
                <TabsTrigger value="code">الكود</TabsTrigger>
                <TabsTrigger value="demo">المعاينة</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">التقنيات المستخدمة</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">الإحصائيات</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-2 bg-muted/20 rounded">
                        <div className="text-xl font-bold">{selectedProject.stats.views}</div>
                        <div className="text-xs text-muted-foreground">مشاهدات</div>
                      </div>
                      <div className="text-center p-2 bg-muted/20 rounded">
                        <div className="text-xl font-bold">{selectedProject.stats.likes}</div>
                        <div className="text-xs text-muted-foreground">إعجابات</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">التحديات</h3>
                  <ul className="space-y-1">
                    {selectedProject.challenges.map((challenge, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                {selectedProject.codeSnippets.map((snippet, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-sm">{snippet.description}</h4>
                    <div className="bg-muted/20 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code className={`language-${snippet.language}`}>
                          {snippet.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="demo" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isPlaying ? stopSlideshow : startSlideshow}
                      disabled={selectedProject.screenshots.length <= 1}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'إيقاف' : 'تشغيل'} العرض
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetSlideshow}>
                      <RotateCcw className="w-4 h-4" />
                      إعادة تعيين
                    </Button>
                    <div className="ml-auto flex gap-2">
                      {selectedProject.demoUrl && (
                        <Button asChild size="sm">
                          <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            معاينة مباشرة
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" asChild size="sm">
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/10 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <Maximize2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        لقطة شاشة {currentScreenshot + 1} من {selectedProject.screenshots.length}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedProject.screenshots[currentScreenshot]}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    {selectedProject.screenshots.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentScreenshot ? 'bg-primary' : 'bg-muted-foreground'
                        }`}
                        onClick={() => setCurrentScreenshot(index)}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
