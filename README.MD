# 회원 관리 시스템 (Record Management System)

Business Canvas 채용 과제 - React + TypeScript + Ant Design 기반 회원 관리 시스템

---

## 📂 1. 폴더 구조

### Domain-Driven Design (DDD) 채택

### DDD를 선택한 이유

1. **비즈니스 로직 응집도 향상**
   - `record` 도메인 관련 코드(컴포넌트, 훅, 타입)를 한 곳에 모아 관리
   - 도메인 용어(`Record`, `Field`)를 코드 구조에 직접 반영

2. **확장성 확보**
   - 향후 다른 기능 추가 시 예)`domains/field/` 방식으로 독립적으로 개발 가능
   - 도메인 간 의존성 최소화

3. **순환 참조 방지**
   - `shared/type`에서 공통 타입(`Job`, `Record`, `Field`) 관리
   - 도메인 간 타입 공유 시 명확한 의존성 방향 유지

4. **팀 협업 용이**
   - 도메인별로 작업 분리 가능
   - 코드 충돌 최소화

---

## 📦 2. 사용한 라이브러리 목록

### 필수 스택

```json
{
  "react": "^18.3.1",
  "typescript": "~5.6.2",
  "antd": "^5.22.6"
}
```

### 선택 스택 및 선택 이유

#### 스타일링

- **@emotion/styled** `^11.14.0`
  - **이유**: Ant Design 커스터마이징 용이, 컴포넌트 기반 스타일링으로 유지보수성 향상

#### 상태 관리

- **zustand** `^5.0.2`
  - **이유**:
    - 간결한 API (Redux 대비 보일러플레이트 최소)
    - `persist` middleware로 localStorage 연동 간편
    - TypeScript 지원 우수
    - 가벼움 (~1KB gzipped)

#### 날짜 처리

- **dayjs** `^1.11.13`
  - **이유**:
    - 가벼움 (moment.js 대비 ~2KB)
    - DatePicker와 Date 객체 간 변환
    - 필터링 시 날짜 비교 로직
  - **사용처**: `isSame()` 메서드로 날짜 필터링

#### ID 생성

- **uuid** `^11.0.5`
  - **이유**: 충돌 없는 고유 ID 생성 (타임스탬프 대비 안전)
  - **사용처**: 신규 레코드 생성 시 `id` 자동 생성

---

## 🎯 3. 과제 요구사항 반영 및 고민

### 핵심 요구사항: "미래의 커스텀 필드 기능 대비"

> 현재는 6개의 고정된 필드만 존재하지만, 향후 사용자가 직접 필드를 추가/수정/삭제하는 기능이 도입될 예정

---

### ✅ 반영한 부분

#### 1) `FIELD_DEFINITIONS` 중앙화

**위치**: `src/shared/type/field.ts`

```typescript
export const FIELD_DEFINITIONS: FieldDefinition[] =
  [
    {
      id: 'name',
      type: 'text',
      label: '이름',
      required: true,
      maxLength: 20,
    },
    // ... 다른 필드들
  ];
```

**장점**:

- 모든 필드 정보를 **한 곳**에서 관리
- 새 필드 추가 시 이 배열만 수정하면 자동으로:
  - ✅ Table 컬럼 생성
  - ✅ Form 입력 필드 생성
  - ✅ Filter 옵션 생성
  - ✅ Validation 규칙 적용

---

#### 2) 동적 Form 렌더링

**위치**: `src/domains/record/components/RecordList/RecordModal/RecordForm/`

**구현**:

```typescript
// RecordForm/index.tsx
{FIELD_DEFINITIONS.map((field) => (
  <Form.Item key={field.id} name={field.id} rules={getFieldRules({ field })}>
    {renderField(field)}
  </Form.Item>
))}

// utils/renderField.tsx
export default function renderField(field: FieldDefinition) {
  switch (field.type) {
    case 'text': return <Input maxLength={field.maxLength} />;
    case 'textarea': return <Input.TextArea maxLength={field.maxLength} />;
    case 'date': return <DatePicker />;
    case 'select': return <Select options={field.options} />;
    case 'checkbox': return <Checkbox />;
  }
}
```

**확장 시나리오**:

```typescript
// 새로운 필드 타입 추가
case 'number': return <InputNumber />;
case 'email': return <Input type="email" />;
```

---

#### 3) 동적 Table 컬럼 생성

**위치**: `src/domains/record/components/RecordList/RecordTable/useTableColumns.tsx`

**구현**:

- `FIELD_DEFINITIONS` 순회하며 컬럼 자동 생성
- 각 필드의 `type`에 따라 렌더링 방식 변경
- 필터 옵션도 동적 생성 (`getUniqueValues`)

**장점**:

- 하드코딩 제거
- 필드 추가/삭제 시 자동 반영

---

#### 4) Union Type 기반 타입 시스템

**위치**: `src/shared/type/field.ts`

```typescript
export type FieldDefinition =
  | TextFieldDefinition
  | SelectFieldDefinition
  | DateFieldDefinition
  | CheckboxFieldDefinition;
```

**장점**:

- 새로운 필드 타입 추가 시 Union에 추가만 하면 됨
- TypeScript가 타입 체크 자동 수행

---

## 🗂 4. 상태 관리 패턴

### Zustand 기반 중앙 집중식 상태 관리

#### Store 구조

```typescript
interface RecordState {
  // State
  records: Record[];
  filters: FilterState;

  // Selectors (읽기)
  getUniqueValues: (
    field: FieldID
  ) => (string | boolean | Date)[];
  getFilteredRecords: () => Record[];
  getRecordById: (
    id: string
  ) => Record | undefined;

  // Actions (쓰기)
  setFilter: (
    field: FieldID,
    values: Record[FieldID][]
  ) => void;
  addRecord: (record: Omit<Record, 'id'>) => void;
  updateRecord: (
    id: string,
    updatedData: Omit<Record, 'id'>
  ) => void;
  deleteRecord: (id: string) => void;
}
```

---

### 패턴 1: Selector 활용

**목적**: 파생 데이터 생성 (필터링, 고유 값 추출)

```typescript
// Store 정의
getFilteredRecords: () => {
  const { records, filters } = get();
  return records.filter((record) => {
    return (
      Object.keys(filters) as FieldID[]
    ).every((field) => {
      return isMatchFilter(
        field,
        record[field],
        filters[field]
      );
    });
  });
};

// 컴포넌트 사용
const getFilteredRecords = useRecordStore(
  (state) => state.getFilteredRecords
);
const records = getFilteredRecords();
```

**장점**:

- ✅ 컴포넌트에서 필터링 로직 제거
- ✅ 재사용 가능
- ✅ 단일 진실 공급원 (Single Source of Truth)

---

### 패턴 2: 불변성 유지

**원칙**: 기존 state를 직접 수정하지 않고 새로운 객체 반환

```typescript
// ✅ 좋은 예
addRecord: (newRecord) => {
  set((state) => ({
    records: [
      ...state.records,
      { ...newRecord, id: uuidv4() },
    ],
  }));
};

// ❌ 나쁜 예
addRecord: (newRecord) => {
  const records = get().records;
  records.push(newRecord); // 직접 변경 (불변성 위배)
  set({ records });
};
```

**이유**: React의 렌더링 최적화를 위해 필수

---

### 패턴 3: 헬퍼 함수 분리

**위치**: `recordStore.util.ts`

```typescript
// 헬퍼 함수 분리
export const isMatchFilter = (
  field: FieldID,
  recordValue: Record[FieldID],
  filterValues: Record[FieldID][]
): boolean => {
  if (filterValues.length === 0) return true;

  if (field === 'joinDate') {
    return filterValues.some((v) =>
      dayjs(v as Date).isSame(
        dayjs(recordValue as Date),
        'day'
      )
    );
  }

  return filterValues.includes(recordValue);
};
```

**장점**:

- ✅ 테스트 용이
- ✅ Store 로직 간소화
- ✅ 재사용 가능

---

### 패턴 4: 모듈화 (관심사의 분리)

```
store/
├── recordStore.ts        # Store 메인 로직
├── recordStore.type.ts   # 타입 정의
├── recordStore.util.ts   # 헬퍼 함수
└── mock.ts              # 초기 데이터
```

**장점**:

- ✅ 단일 책임 원칙
- ✅ 파일당 100줄 이내 유지
- ✅ import 경로 명확

---

## 🚀 실행 방법

### 환경 변수 설정

`.env.development` 파일:

```bash
# 데이터 저장 방식
VITE_STORAGE=local-storage  # or in-memory
```

### 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 (local-storage)
npm run dev

# 개발 서버 (in-memory)
VITE_STORAGE=in-memory npm run dev
```

---

## 🧪 주요 기능

### ✅ CRUD 전체 구현

- **Create**: 회원 추가 (필수값 검증, maxLength 체크)
- **Read**: 회원 목록 조회 + 필터링
- **Update**: 회원 수정 (기존 데이터 자동 로드)
- **Delete**: 회원 삭제 (확인 모달)

### ✅ 동적 필터링

- 모든 필드에 대한 체크박스 기반 필터
- 현재 데이터 기반 옵션 생성
- 다중 선택 지원
- 빈 값 자동 제외

### ✅ 동적 Form

- `FIELD_DEFINITIONS` 기반 자동 생성
- 필드별 Validation 규칙 적용
- 실시간 검증 및 에러 표시

---

## 💻 Git 전략

### Git Flow

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발
- `refactor/*`: 리팩토링
- `fix/*`: 버그 수정

### 커밋 컨벤션

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `style`: 스타일 변경
- `docs`: 문서 수정
