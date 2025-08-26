import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MaterialTestingModule } from '../../testing/material-testing.module';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockTaskService = jasmine.createSpyObj<TaskService>('TaskService', ['createTask']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue(null)
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialTestingModule
      ],
      declarations: [TaskFormComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createTask on form submit', () => {
    component.taskForm.setValue({
      nom: 'Nouvelle tâche',
      description: 'Description ici',
      statut: 'à faire'
    });

    mockTaskService.createTask.and.returnValue(of({
      id: 1,
      nom: 'Nouvelle tâche',
      description: 'Description ici',
      statut: 'à faire',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    component.onSubmit();

    expect(mockTaskService.createTask).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
